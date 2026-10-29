import { resolve } from "node:path";
import { z } from "incur";
import { createGameProjectInspectionService } from "../composition/gameProject.js";
import { CLI_COMMANDS } from "../cliCommandNames.js";
import { logCliCommand } from "../cliLogging.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import type { Logger } from "../logger.js";
import type { CliInstance } from "./types.js";
import { withCommandCancellation } from "./commandCancellation.js";

/** Inspect a game project through the same workflow and limits as MCP. */
export const registerGameProjectCommands = (
  cli: CliInstance,
  logger: Logger,
): void => {
  const service = createGameProjectInspectionService();
  cli.command(CLI_COMMANDS.inspectGameProject, {
    description:
      "Inspect exported game project assets, scene paths, GUIDs and stub candidates without running Unity",
    args: z.object({
      path: z.string().describe("Local Unity project directory"),
    }),
    options: z.object({
      maxEntries: z.number().int().positive().optional(),
      maxReadBytes: z.number().int().positive().optional(),
      maxFileBytes: z.number().int().positive().optional(),
    }),
    run: ({ args, options }) =>
      withCommandCancellation((signal) =>
        logCliCommand(logger, CLI_COMMANDS.inspectGameProject, async () => {
          const result = await service.inspect(
            {
              path: resolve(args.path),
              ...(options.maxEntries === undefined
                ? {}
                : { max_entries: options.maxEntries }),
              ...(options.maxReadBytes === undefined
                ? {}
                : { max_read_bytes: options.maxReadBytes }),
              ...(options.maxFileBytes === undefined
                ? {}
                : { max_file_bytes: options.maxFileBytes }),
            },
            { signal },
          );
          return result.ok ? result.value : projectAnalysisError(result.error);
        }),
      ),
  });
};
