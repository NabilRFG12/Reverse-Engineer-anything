import { z } from "zod";
import { digestSchema } from "./digests.js";

/** Identity of the static game-project inspection capability. */
export const GAME_PROJECT_PROVIDER = {
  id: "rea-game-project",
  name: "REA game project inspection",
  version: "1",
} as const;

/** Resource limits bound retained text and traversal, not target execution. */
export const gameProjectInputSchema = z.strictObject({
  path: z.string().min(1).describe("Absolute local game project directory"),
  max_entries: z.number().int().positive().safe().default(100_000),
  max_read_bytes: z
    .number()
    .int()
    .positive()
    .safe()
    .default(64 * 1024 * 1024),
  max_file_bytes: z
    .number()
    .int()
    .positive()
    .safe()
    .default(8 * 1024 * 1024),
});

const sourceSchema = z.strictObject({
  path: z.string(),
  sha256: digestSchema,
  bytes: z.number().int().nonnegative(),
});
const skippedSchema = z.strictObject({ path: z.string(), reason: z.string() });
const methodSchema = z.strictObject({
  path: z.string(),
  line: z.number().int().positive(),
  name: z.string(),
  body: z.enum(["empty", "default-return", "throw-null"]),
});

/** Static observations and explicit inferences about an exported game project. */
export const gameProjectReportSchema = z.strictObject({
  project_path: z.string(),
  engine: z.literal("unity"),
  editor_version: z.string().nullable(),
  inspection_sha256: digestSchema,
  coverage: z.strictObject({
    directory_inventory: z.enum(["complete", "partial"]),
    selected_text: z.enum(["complete", "partial"]),
    csharp_analysis: z.literal("heuristic"),
    inspected_text_bytes: z.number().int().nonnegative(),
    enumerated_entries: z.number().int().nonnegative(),
    skipped: z.array(skippedSchema),
  }),
  observations: z.strictObject({
    case_collisions: z.array(z.array(z.string()).min(2)),
    duplicate_guids: z.array(
      z.strictObject({ guid: z.string(), paths: z.array(z.string()).min(2) }),
    ),
    missing_meta: z.array(z.string()),
    invalid_meta: z.array(z.string()),
    build_scenes: z.array(
      z.strictObject({
        path: z.string(),
        serialized_path: z.string(),
        enabled: z.boolean(),
        state: z.enum(["present", "missing", "unknown", "invalid-path"]),
      }),
    ),
    build_settings_state: z.enum(["inspected", "not-inspected"]),
    unresolved_script_references: z.array(
      z.strictObject({
        path: z.string(),
        line: z.number().int().positive(),
        guid: z.string(),
      }),
    ),
    csharp_files: z.number().int().nonnegative(),
  }),
  inferences: z.strictObject({
    stub_candidates: z.array(methodSchema),
    lifecycle_candidates: z.array(methodSchema),
  }),
  unknowns: z.array(z.string()),
  limitations: z.array(z.string()),
  sources: z.array(sourceSchema),
});

export type GameProjectInput = z.infer<typeof gameProjectInputSchema>;
export type GameProjectReport = z.infer<typeof gameProjectReportSchema>;
