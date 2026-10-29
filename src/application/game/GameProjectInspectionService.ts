import { isAbsolute } from "node:path";
import type { ExecutionOptions } from "../AnalysisProvider.js";
import type { GameProjectInspectionPort } from "./GameProjectInspectionPort.js";
import type { AnalysisError } from "../../domain/analysisErrorBase.js";
import {
  AnalysisCancelledError,
  AnalysisInputError,
  AnalysisOutputError,
} from "../../domain/analysisErrorCore.js";
import { createEvidence, type Evidence } from "../../domain/evidence.js";
import {
  gameProjectInputSchema,
  gameProjectReportSchema,
} from "../../domain/gameProject.js";
import { analysisInputErrorFromIssues } from "../../domain/inputIssueProjection.js";
import { err, ok, type Result } from "../../domain/result.js";

const OPERATION = "inspect_game_project";

/** Shared CLI/MCP inspection with caller identity and provider-output validation. */
export class GameProjectInspectionService {
  constructor(readonly provider: GameProjectInspectionPort) {}

  /** Inspect static project bytes; never infer that a project is playable. */
  async inspect(
    rawInput: unknown,
    options?: ExecutionOptions,
  ): Promise<Result<Evidence, AnalysisError>> {
    if (options?.signal?.aborted)
      return err(new AnalysisCancelledError(OPERATION));
    const input = gameProjectInputSchema.safeParse(rawInput);
    if (!input.success)
      return err(
        analysisInputErrorFromIssues(OPERATION, input.error.issues, rawInput, {
          cause: input.error,
        }),
      );
    if (!isAbsolute(input.data.path))
      return err(
        new AnalysisInputError(OPERATION, undefined, [
          {
            path: ["path"],
            reason: "invalid_format",
            message: "Expected an absolute local directory path on this host.",
          },
        ]),
      );
    const inspected = await this.provider.inspect(input.data, options);
    if (!inspected.ok) return inspected;
    if (options?.signal?.aborted)
      return err(new AnalysisCancelledError(OPERATION));
    const parsed = gameProjectReportSchema.safeParse(inspected.value);
    if (!parsed.success || parsed.data.project_path !== input.data.path)
      return err(
        new AnalysisOutputError(
          OPERATION,
          "Project inspection returned malformed facts or changed the caller-selected project path.",
        ),
      );
    const report = parsed.data;
    return ok(
      createEvidence(
        // This scan identifies selected text and layout, not every project byte.
        // Keep its scoped digest in the report rather than inventing a root artifact identity.
        undefined,
        this.provider.identity,
        {
          operation: OPERATION,
          predicateType: "rea.game-project-inspection",
          parameters: input.data,
          result: report,
          rawResult: null,
          confidence: "derived",
          limitations: report.limitations,
          // Per-file paths and hashes already accompany every source inline.
          locations: [{ kind: "artifact-path", path: report.project_path }],
        },
      ),
    );
  }
}
