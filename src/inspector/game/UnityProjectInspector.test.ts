import { mkdir, readFile, readdir, symlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createTestTempDirectory } from "../../../tests/fixtures/temporaryDirectory.js";
import { gameProjectInputSchema } from "../../domain/gameProject.js";
import { UnityProjectInspector } from "./UnityProjectInspector.js";
import { inspectCSharpStubCandidates } from "./CSharpStubCandidates.js";

const GUID = "0123456789abcdef0123456789abcdef";

const fixture = async () => {
  const root = await createTestTempDirectory("rea-game-project-");
  const write = async (path: string, content: string | Buffer) => {
    const target = join(root, path);
    await mkdir(join(target, ".."), { recursive: true });
    await writeFile(target, content);
  };
  await write(
    "Assets/Scripts/Launcher.cs",
    `public class Launcher { private void Awake() { /* exported */ } public bool CanMerge(Fruit other) { return false; } public void StartGame() { throw null; } }`,
  );
  await write(
    "Assets/Scripts/Launcher.cs.meta",
    `fileFormatVersion: 2\nguid: ${GUID}\n`,
  );
  await write(
    "Assets/Scripts.meta",
    `fileFormatVersion: 2\nguid: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n`,
  );
  await write(
    "Assets/Scenes/Game.unity",
    `%YAML 1.1\nm_Script: {fileID: 11500000, guid: ${GUID}, type: 3}\n  m_Script: {fileID: 11500000, guid: bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb, type: 3}\n`,
  );
  await write(
    "ProjectSettings/ProjectVersion.txt",
    "m_EditorVersion: 6000.4.12f1\n",
  );
  await write(
    "ProjectSettings/EditorBuildSettings.asset",
    `%YAML 1.1\nEditorBuildSettings:\n  m_Scenes:\n  - enabled: 1\n    path: "Assets/Scenes/Game.unity"\n    guid: ${GUID}\n  - enabled: 0\n    path: Assets/Scenes/Missing.unity\n  - enabled: 1\n    path: Assets/../outside.unity\n`,
  );
  return { root, write };
};

describe("Unity exported game inspection", () => {
  it("joins GUID/scene observations with located stub candidates without changing source", async () => {
    const { root, write } = await fixture();
    await write("Assets/Duplicate.cs", "public class Duplicate { }");
    await write("Assets/Duplicate.cs.meta", `guid: ${GUID}\n`);
    await write("Assets/Bad.meta", "fileFormatVersion: 2\nguid: broken\n");
    const original = await readFile(join(root, "Assets/Scripts/Launcher.cs"));
    const inspector = new UnityProjectInspector();
    const result = await inspector.inspect(
      gameProjectInputSchema.parse({ path: root }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) throw result.error;
    const report = result.value;
    expect(report.editor_version).toBe("6000.4.12f1");
    expect(report.coverage).toMatchObject({
      directory_inventory: "complete",
      selected_text: "complete",
    });
    expect(report.observations.case_collisions).toEqual([]);
    expect(report.observations.duplicate_guids).toEqual([
      {
        guid: GUID,
        paths: ["Assets/Duplicate.cs.meta", "Assets/Scripts/Launcher.cs.meta"],
      },
    ]);
    expect(report.observations.invalid_meta).toEqual(["Assets/Bad.meta"]);
    expect(report.observations.missing_meta).toContain(
      "Assets/Scenes/Game.unity",
    );
    expect(
      report.observations.build_scenes.map((s) => [s.path, s.state]),
    ).toEqual([
      ["Assets/Scenes/Game.unity", "present"],
      ["Assets/Scenes/Missing.unity", "missing"],
      ["Assets/../outside.unity", "invalid-path"],
    ]);
    expect(report.observations.build_scenes[0]?.serialized_path).toBe(
      '"Assets/Scenes/Game.unity"',
    );
    expect(report.observations.unresolved_script_references).toEqual([
      {
        path: "Assets/Scenes/Game.unity",
        line: 3,
        guid: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      },
    ]);
    expect(
      report.inferences.stub_candidates.map((c) => [c.name, c.body]),
    ).toEqual([
      ["Awake", "empty"],
      ["CanMerge", "default-return"],
      ["StartGame", "throw-null"],
    ]);
    expect(report.inferences.lifecycle_candidates.map((c) => c.name)).toEqual([
      "Awake",
      "StartGame",
    ]);
    expect(await readFile(join(root, "Assets/Scripts/Launcher.cs"))).toEqual(
      original,
    );
    const repeated = await inspector.inspect(
      gameProjectInputSchema.parse({ path: root }),
    );
    expect(repeated).toEqual(result);
    await write(
      "Assets/Scripts/Launcher.cs",
      original.toString().replace("return false;", "return other != null;"),
    );
    const changed = await inspector.inspect(
      gameProjectInputSchema.parse({ path: root }),
    );
    expect(changed.ok && changed.value.inspection_sha256).not.toBe(
      report.inspection_sha256,
    );
  });

  it("keeps resource gaps and symlink targets explicit, without inventing missing files", async () => {
    const { root, write } = await fixture();
    const outside = await createTestTempDirectory("rea-game-outside-");
    await writeFile(join(outside, "secret.cs"), "private void Awake() { }");
    await symlink(
      outside,
      join(root, "Assets/Linked"),
      process.platform === "win32" ? "junction" : "dir",
    );
    await write("Assets/Binary.asset", Buffer.from([0, 255, 1, 2]));
    const result = await new UnityProjectInspector().inspect(
      gameProjectInputSchema.parse({ path: root, max_file_bytes: 100 }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) throw result.error;
    expect(result.value.coverage.selected_text).toBe("partial");
    expect(result.value.coverage.skipped).toEqual(
      expect.arrayContaining([
        { path: "Assets/Linked", reason: "symbolic-link-not-followed" },
        {
          path: "Assets/Binary.asset",
          reason: "binary-serialization-not-decoded",
        },
        {
          path: "Assets/Scripts/Launcher.cs",
          reason: "file-text-budget-exceeded",
        },
      ]),
    );
    expect(result.value.sources.some((s) => s.path.includes("secret"))).toBe(
      false,
    );
    const partial = await new UnityProjectInspector().inspect(
      gameProjectInputSchema.parse({ path: root, max_entries: 1 }),
    );
    expect(partial.ok).toBe(true);
    if (!partial.ok) throw partial.error;
    expect(partial.value.coverage.directory_inventory).toBe("partial");
    expect(partial.value.observations.missing_meta).toEqual([]);
    const budget = await new UnityProjectInspector().inspect(
      gameProjectInputSchema.parse({ path: root, max_read_bytes: 1 }),
    );
    expect(budget.ok && budget.value.coverage.selected_text).toBe("partial");
  });
});

describe("case-collision producer representation", () => {
  it("reports distinct exported paths when the host preserves their case", async (context) => {
    const { root, write } = await fixture();
    await write("Assets/Resources/prefabs/animation.meta", `guid: ${GUID}\n`);
    await write(
      "Assets/resources/prefabs/animation.meta",
      "guid: cccccccccccccccccccccccccccccccc\n",
    );
    const names = await readdir(join(root, "Assets"));
    if (!names.includes("Resources") || !names.includes("resources")) {
      context.skip();
      return;
    }
    const result = await new UnityProjectInspector().inspect(
      gameProjectInputSchema.parse({ path: root }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) throw result.error;
    expect(result.value.observations.case_collisions).toContainEqual([
      "Assets/Resources/prefabs/animation.meta",
      "Assets/resources/prefabs/animation.meta",
    ]);
  });
});

describe("game project analysis boundaries", () => {
  it("reserves a shared byte budget before overlapping file reads", async () => {
    const { root, write } = await fixture();
    for (let i = 0; i < 24; i++)
      await write(
        `Assets/Budget/${i}.cs`,
        `public class C${i} { public void Awake() { } }\n`,
      );
    const result = await new UnityProjectInspector().inspect(
      gameProjectInputSchema.parse({ path: root, max_read_bytes: 180 }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) throw result.error;
    expect(result.value.coverage.inspected_text_bytes).toBeLessThanOrEqual(180);
    expect(
      result.value.sources.reduce((total, source) => total + source.bytes, 0),
    ).toBeLessThanOrEqual(180);
    expect(result.value.coverage.selected_text).toBe("partial");
    expect(
      result.value.coverage.skipped.some(
        (s) => s.reason === "total-text-budget-exhausted",
      ),
    ).toBe(true);
  });

  it("distinguishes unsupported roots and cancellation", async () => {
    const root = await createTestTempDirectory("rea-game-unsupported-");
    const inspector = new UnityProjectInspector();
    const unsupported = await inspector.inspect(
      gameProjectInputSchema.parse({ path: root }),
    );
    expect(!unsupported.ok && unsupported.error._tag).toBe(
      "AnalysisUnsupportedTargetError",
    );
    const controller = new AbortController();
    controller.abort();
    const cancelled = await inspector.inspect(
      gameProjectInputSchema.parse({ path: root }),
      { signal: controller.signal },
    );
    expect(!cancelled.ok && cancelled.error._tag).toBe(
      "AnalysisCancelledError",
    );
  });

  it("masks literals/comments and reports uncertain raw strings without fabricating methods", () => {
    const scan = inspectCSharpStubCandidates(
      "Assets/Example.cs",
      `// trái cây 🍉\npublic class Example {\nprivate void Real() { Log("private void Awake() { }"); }\nprivate string Literal() { return ""; }\nprivate void Empty() { /* { } */ }\npublic bool Predicate() => false;\npublic int Number() { return default(int); }\n}`,
    );
    expect(scan.candidates.map((c) => [c.name, c.line])).toEqual([
      ["Empty", 5],
      ["Predicate", 6],
      ["Number", 7],
    ]);
    const raw = inspectCSharpStubCandidates(
      "Assets/Raw.cs",
      'public string Raw() { return """text"""; }',
    );
    expect(raw).toEqual({ candidates: [], uncertain: true });
    expect(
      inspectCSharpStubCandidates("Assets/Broken.cs", "public void Awake() {")
        .uncertain,
    ).toBe(true);
  });
});
