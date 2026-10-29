import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { lstat, open, opendir, realpath } from "node:fs/promises";
import { extname, isAbsolute, join, relative, sep } from "node:path";
import { z } from "zod";
import {
  AnalysisCancelledError,
  AnalysisUnsupportedTargetError,
} from "../../domain/analysisErrorCore.js";
import type {
  GameProjectInput,
  GameProjectReport,
} from "../../domain/gameProject.js";

const OPERATION = "inspect_game_project";
const TEXT_EXTENSIONS = new Set([
  ".meta",
  ".cs",
  ".unity",
  ".prefab",
  ".asset",
]);
// Bounds simultaneous file handles/buffers while overlapping small-file filesystem IO.
const FILE_READ_CONCURRENCY = 8;

/** Acquired text and path facts; no byte identity is asserted for uninspected assets. */
export interface UnityProjectFiles {
  paths: Set<string>;
  sources: GameProjectReport["sources"];
  skipped: GameProjectReport["coverage"]["skipped"];
  texts: Map<string, string>;
  count: number;
  bytes: number;
  inventoryComplete: boolean;
  textComplete: boolean;
}

interface Acquisition extends UnityProjectFiles {
  root: string;
  input: GameProjectInput;
  allocatedBytes: number;
  checkCancelled(): void;
}

const skip = (scan: Acquisition, path: string, reason: string) => {
  scan.skipped.push({ path, reason });
  scan.textComplete = false;
};
const ioCode = (cause: unknown) => {
  const parsed = z.object({ code: z.string() }).safeParse(cause);
  return parsed.success ? parsed.data.code : undefined;
};
const expectedReadFailure = (cause: unknown): boolean => {
  const code = ioCode(cause);
  return (
    code !== undefined &&
    ["ENOENT", "ENOTDIR", "EACCES", "EPERM", "ELOOP", "EIO"].includes(code)
  );
};

const readTextFile = async (scan: Acquisition, path: string): Promise<void> => {
  scan.checkCancelled();
  const handle = await open(
    join(scan.root, ...path.split("/")),
    constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK,
  );
  try {
    const before = await handle.stat();
    if (!before.isFile()) {
      skip(scan, path, "not-a-regular-file");
      return;
    }
    if (before.size > scan.input.max_file_bytes) {
      skip(scan, path, "file-text-budget-exceeded");
      return;
    }
    if (before.size > scan.input.max_read_bytes - scan.allocatedBytes) {
      skip(scan, path, "total-text-budget-exhausted");
      return;
    }
    // Reserve before allocation or the first read; concurrent files cannot exceed the total budget.
    // Failed/changed files retain their reservation conservatively for this inspection.
    scan.allocatedBytes += before.size;
    const buffer = Buffer.alloc(before.size);
    let offset = 0;
    while (offset < buffer.length) {
      scan.checkCancelled();
      const read = await handle.read(
        buffer,
        offset,
        Math.min(65536, buffer.length - offset),
        offset,
      );
      if (read.bytesRead === 0) break;
      offset += read.bytesRead;
    }
    scan.bytes += offset;
    const after = await handle.stat();
    if (
      offset !== before.size ||
      after.size !== before.size ||
      after.mtimeMs !== before.mtimeMs ||
      after.ctimeMs !== before.ctimeMs
    ) {
      skip(scan, path, "file-changed-during-read");
      return;
    }
    if (buffer.includes(0)) {
      skip(scan, path, "binary-serialization-not-decoded");
      return;
    }
    let text: string;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    } catch {
      skip(scan, path, "non-utf8-text-not-decoded");
      return;
    }
    scan.texts.set(path, text);
    scan.sources.push({
      path,
      bytes: buffer.length,
      sha256: createHash("sha256").update(buffer).digest("hex"),
    });
  } finally {
    await handle.close();
  }
};

const inspectFile = async (scan: Acquisition, path: string): Promise<void> => {
  try {
    await readTextFile(scan, path);
  } catch (cause: unknown) {
    if (expectedReadFailure(cause)) {
      skip(scan, path, `file-read-failed:${ioCode(cause) ?? "unknown"}`);
      return;
    }
    throw cause;
  }
};

const visitDirectory = async (
  scan: Acquisition,
  directory: string,
  pending: string[],
  enqueue: (path: string) => Promise<void>,
): Promise<void> => {
  const resolved = await realpath(join(scan.root, directory));
  const rel = relative(scan.root, resolved);
  if (rel === ".." || rel.startsWith(".." + sep) || isAbsolute(rel)) {
    skip(scan, directory, "directory-resolves-outside-project");
    scan.inventoryComplete = false;
    return;
  }
  const entries = await opendir(join(scan.root, directory));
  for await (const entry of entries) {
    scan.checkCancelled();
    if (scan.count >= scan.input.max_entries) {
      skip(scan, directory, "entry-budget-exhausted");
      scan.inventoryComplete = false;
      pending.length = 0;
      break;
    }
    scan.count++;
    const local = join(directory, entry.name),
      path = local.split(sep).join("/");
    scan.paths.add(path);
    if (entry.isSymbolicLink()) {
      skip(scan, path, "symbolic-link-not-followed");
      continue;
    }
    if (entry.isDirectory()) {
      pending.push(local);
      continue;
    }
    if (!entry.isFile()) {
      skip(scan, path, "non-regular-file");
      continue;
    }
    if (
      TEXT_EXTENSIONS.has(extname(path)) ||
      path === "ProjectSettings/ProjectVersion.txt"
    )
      await enqueue(path);
  }
};

const walk = async (scan: Acquisition): Promise<void> => {
  const pending = ["Assets", "ProjectSettings"];
  let reads: Promise<{ error: unknown } | { error?: never }>[] = [];
  const flush = async () => {
    const results = await Promise.all(reads);
    reads = [];
    for (const result of results) if ("error" in result) throw result.error;
  };
  const enqueue = async (path: string) => {
    // Handle rejections immediately, even while traversal awaits another directory.
    reads.push(
      inspectFile(scan, path).then(
        () => ({}),
        (error: unknown) => ({ error }),
      ),
    );
    if (reads.length >= FILE_READ_CONCURRENCY) await flush();
  };
  try {
    while (pending.length > 0) {
      scan.checkCancelled();
      const directory = pending.pop();
      if (directory === undefined) break;
      try {
        await visitDirectory(scan, directory, pending, enqueue);
      } catch (cause: unknown) {
        if (!expectedReadFailure(cause)) throw cause;
        skip(
          scan,
          directory,
          `directory-read-failed:${ioCode(cause) ?? "unknown"}`,
        );
        scan.inventoryComplete = false;
      }
    }
    await flush();
  } finally {
    // Cancellation/failure must finish owned reads and their handle cleanup before returning.
    await Promise.all(reads);
  }
};

/** Acquire Unity text files with aggregate reservations and bounded overlapping IO. */
export const readUnityProjectFiles = async (
  input: GameProjectInput,
  signal?: AbortSignal,
): Promise<UnityProjectFiles> => {
  const checkCancelled = () => {
    if (signal?.aborted) throw new AnalysisCancelledError(OPERATION);
  };
  checkCancelled();
  const root = await realpath(input.path);
  for (const name of ["Assets", "ProjectSettings"]) {
    if (!(await lstat(join(root, name))).isDirectory())
      throw new AnalysisUnsupportedTargetError(
        OPERATION,
        input.path,
        `${name} must be a directory, not a link or file`,
      );
  }
  const scan: Acquisition = {
    root,
    input,
    allocatedBytes: 0,
    checkCancelled,
    paths: new Set(),
    sources: [],
    skipped: [],
    texts: new Map(),
    count: 0,
    bytes: 0,
    inventoryComplete: true,
    textComplete: true,
  };
  await walk(scan);
  scan.sources.sort((a, b) => a.path.localeCompare(b.path, "en"));
  scan.skipped.sort(
    (a, b) =>
      a.path.localeCompare(b.path, "en") ||
      a.reason.localeCompare(b.reason, "en"),
  );
  return scan;
};
