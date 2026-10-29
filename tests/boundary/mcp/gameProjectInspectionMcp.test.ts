import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import { Client, InMemoryTransport } from "@modelcontextprotocol/client";
import { Ajv2020 } from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";
import { evidenceSchema } from "../../../src/domain/evidence.js";
import { gameProjectReportSchema } from "../../../src/domain/gameProject.js";
import { toolContract } from "../../../src/contracts/toolContracts.js";
import { createServer } from "../../../src/server/createServer.js";
import { createTestBinarySession } from "../../fixtures/binarySession.js";
import { createTestTempDirectory } from "../../fixtures/temporaryDirectory.js";
import { observed } from "../../fixtures/analysisExecution.js";

const execute = promisify(execFile);

describe("game-project CLI/MCP boundary", () => {
  it("returns identical static evidence through real files, CLI and SDK-converted schemas", async () => {
    const root = await createTestTempDirectory("rea-game-mcp-");
    await mkdir(join(root, "Assets"));
    await mkdir(join(root, "ProjectSettings"));
    const source =
      "public class Game { private void Awake() { } public bool CanMerge() { return false; } }";
    await writeFile(join(root, "Assets/Game.cs"), source);
    await writeFile(
      join(root, "Assets/Game.cs.meta"),
      "guid: 0123456789abcdef0123456789abcdef\n",
    );
    await writeFile(
      join(root, "ProjectSettings/ProjectVersion.txt"),
      "m_EditorVersion: 6000.4.12f1\n",
    );
    const session = createTestBinarySession(() => ({
      execute: () => Promise.resolve(observed(null)),
      close: () => Promise.resolve(),
    }));
    const server = createServer(session, session);
    const client = new Client({
      name: "game-project-inspection-test",
      version: "1",
    });
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();
    try {
      await server.connect(serverTransport);
      await client.connect(clientTransport);
      const tools = await client.listTools();
      const contract = tools.tools.find(
        (t) => t.name === "inspect_game_project",
      );
      expect(contract).toBeDefined();
      if (!contract || !contract.outputSchema)
        throw new Error("Missing game inspection schemas");
      const ajv = new Ajv2020({ strict: false, validateFormats: false });
      const inputSchema: Record<string, unknown> = contract.inputSchema;
      const outputSchema: Record<string, unknown> = contract.outputSchema;
      expect(ajv.validateSchema(inputSchema)).toBe(true);
      expect(ajv.validateSchema(outputSchema)).toBe(true);
      expect(ajv.validate(inputSchema, { path: root })).toBe(true);
      const response = await client.callTool({
        name: "inspect_game_project",
        arguments: { path: root },
      });
      expect(response.isError).not.toBe(true);
      expect(
        ajv.validate(outputSchema, response.structuredContent),
        JSON.stringify(ajv.errors),
      ).toBe(true);
      const structured = toolContract(
        "inspect_game_project",
      ).outputSchema.parse(response.structuredContent);
      const report = gameProjectReportSchema.parse(structured.result);
      expect(report.inferences.lifecycle_candidates.map((c) => c.name)).toEqual(
        ["Awake"],
      );
      expect(report.unknowns.some((s) => s.includes("Play Mode"))).toBe(true);
      const cli = await execute(
        process.execPath,
        ["scripts/rea.mjs", "inspect-game-project", root, "--json"],
        {
          cwd: process.cwd(),
          env: { ...process.env, REA_LOG_LEVEL: "silent" },
          maxBuffer: 4 * 1024 * 1024,
        },
      );
      const evidence = evidenceSchema.parse(JSON.parse(cli.stdout));
      expect(evidence.normalized_result).toEqual(report);
      expect(evidence.evidence_id).toBe(structured.evidence_id);
      expect(evidence.subject).toBeNull();
      expect(evidence.parameters.path).toBe(root);
      expect(evidence.locations).toEqual([
        { kind: "artifact-path", path: root },
      ]);
      expect(await readFile(join(root, "Assets/Game.cs"), "utf8")).toBe(source);
      const malformed = await client.callTool({
        name: "inspect_game_project",
        arguments: { path: root, execute: true },
      });
      expect(malformed.isError).toBe(true);
      const relative = await client.callTool({
        name: "inspect_game_project",
        arguments: { path: "relative/project" },
      });
      expect(relative.isError).toBe(true);
      expect(relative.structuredContent).toMatchObject({
        error: { code: "invalid_request" },
      });
      const limited = await client.callTool({
        name: "inspect_game_project",
        arguments: { path: root, max_entries: 1 },
      });
      expect(limited.structuredContent).toMatchObject({
        result: {
          coverage: { directory_inventory: "partial" },
          observations: { missing_meta: [] },
        },
      });
    } finally {
      await client.close();
      await server.close();
      await session.close();
    }
  }, 30_000);
});
