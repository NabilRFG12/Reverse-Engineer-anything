import type { ExecutionOptions } from "../AnalysisProvider.js";
import type { AnalysisError } from "../../domain/analysisErrorBase.js";
import type { EvidenceProvider } from "../../domain/evidence.js";
import type {
  GameProjectInput,
  GameProjectReport,
} from "../../domain/gameProject.js";
import type { Result } from "../../domain/result.js";

/** Read-only project inspection, independent of editor processes and decompilers. */
export interface GameProjectInspectionPort {
  readonly identity: EvidenceProvider;
  inspect(
    input: GameProjectInput,
    options?: ExecutionOptions,
  ): Promise<Result<GameProjectReport, AnalysisError>>;
}
