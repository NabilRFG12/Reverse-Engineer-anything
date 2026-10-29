import { STDIO_DEFAULT_MAX_BUFFER_SIZE } from "@modelcontextprotocol/server";
import { describe, expect, it } from "vitest";
import { GameProjectInspectionService } from "../../../src/application/game/GameProjectInspectionService.js";
import {
  GAME_PROJECT_PROVIDER,
  gameProjectReportSchema,
} from "../../../src/domain/gameProject.js";
import { ok } from "../../../src/domain/result.js";
import { toolContract } from "../../../src/contracts/toolContracts.js";
import { toEvidenceToolResult } from "../../../src/server/toolResult.js";

describe("large recovered-project MCP report", () => {
  it("delivers complete producer-shaped text identities without multiplying the root path", async () => {
    // Exercises the observed 11k-source export shape with a long caller-selected root.
    // This is a transport regression, not evidence that these fixture files were acquired.
    const path = "/" + "recovered-project-location/".repeat(70) + "Game";
    const sha = "ab".repeat(32);
    const sources = Array.from({ length: 11000 }, (_, i) => ({
      path: `Assets/bundles/main/prefabs/game/rooms/room${i}/decoration.asset.meta`,
      sha256: sha,
      bytes: 64,
    }));
    const report = gameProjectReportSchema.parse({
      project_path: path,
      engine: "unity",
      editor_version: "6000.4.12f1",
      inspection_sha256: sha,
      sources,
      coverage: {
        directory_inventory: "complete",
        selected_text: "complete",
        csharp_analysis: "heuristic",
        inspected_text_bytes: sources.length * 64,
        enumerated_entries: sources.length,
        skipped: [],
      },
      observations: {
        case_collisions: [],
        duplicate_guids: [],
        missing_meta: [],
        invalid_meta: [],
        build_scenes: [],
        build_settings_state: "not-inspected",
        unresolved_script_references: [],
        csharp_files: 0,
      },
      inferences: { stub_candidates: [], lifecycle_candidates: [] },
      unknowns: ["Whole-project byte identity is unknown"],
      limitations: ["Text and layout inspection only"],
    });
    const service = new GameProjectInspectionService({
      identity: GAME_PROJECT_PROVIDER,
      inspect: () => Promise.resolve(ok(report)),
    });
    const result = await service.inspect({ path });
    expect(result.ok).toBe(true);
    if (!result.ok) throw result.error;
    const contract = toolContract("inspect_game_project");
    const response = toEvidenceToolResult(result.value, contract, undefined);
    expect(response.isError).not.toBe(true);
    expect(Buffer.byteLength(JSON.stringify(response))).toBeLessThan(
      STDIO_DEFAULT_MAX_BUFFER_SIZE,
    );
    const parsed = contract.outputSchema.parse(response.structuredContent);
    expect(gameProjectReportSchema.parse(parsed.result).sources).toEqual(
      sources,
    );
    expect(result.value.subject).toBeNull();
    expect(result.value.parameters.path).toBe(path);
  });
});
