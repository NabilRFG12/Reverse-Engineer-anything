import type { McpServer } from "@modelcontextprotocol/server";
import type { GameProjectInspectionService } from "../application/game/GameProjectInspectionService.js";
import type { EvidenceWriter } from "../application/investigation/InvestigationRecordPort.js";
import { toolContract } from "../contracts/toolContracts.js";
import type { Logger } from "../logger.js";
import { logToolExecution } from "./toolLogging.js";
import { toolRegistrationOptions } from "./toolRegistrationOptions.js";
import { toCallToolResult, toEvidenceToolResult } from "./toolResult.js";

/** Bind the inspection handler to its named contract and shared workflow. */
export const registerGameProjectTools = (
  server: McpServer,
  service: GameProjectInspectionService,
  logger: Logger,
  recordEvidence?: EvidenceWriter["recordEvidence"],
): void => {
  const contract = toolContract("inspect_game_project");
  server.registerTool(
    contract.name,
    toolRegistrationOptions(contract),
    async (input, context) => {
      const result = await logToolExecution(logger, contract.name, () =>
        service.inspect(input, { signal: context.mcpReq.signal }),
      );
      if (!result.ok) return toCallToolResult(result, contract);
      return toEvidenceToolResult(
        result.value,
        contract,
        recordEvidence?.(result.value),
      );
    },
  );
};
