import { applicationVersionComparisonResultSchema } from "../domain/javascript/javascriptApplicationVersionComparisonSchemas.js";
import {
  gameProjectInputSchema,
  gameProjectReportSchema,
} from "../domain/gameProject.js";
import { applicationFeatureTraceResultSchema } from "../domain/javascript/javascriptFeatureTraceSchemas.js";
import { javaScriptSemanticTraceResultSchema } from "../domain/javascript/javascriptSemanticTraceSchemas.js";
import { javaScriptExportShapeComparisonResultSchema } from "../domain/javascript/javascriptExportShapeComparisonSchemas.js";
import { sourceToBundleComparisonResultSchema } from "../domain/javascript/sourceToBundleComparisonSchemas.js";
import {
  compareApplicationVersionsRequestSchema,
  compareJavaScriptExportShapesRequestSchema,
  compareSourceToBundleRequestSchema,
  traceApplicationFeatureRequestSchema,
  traceJavaScriptSemanticsRequestSchema,
} from "./javascript/applicationWorkflowInputContracts.js";
import { reconstructionCoverageEvaluationInputSchema } from "../domain/reconstructionCoverageInput.js";
import { reconstructionClosureResultSchema } from "../domain/reconstructionCoverage.js";
import {
  reconstructionObligationLedgerInputSchema,
  reconstructionObligationLedgerSchema,
} from "../domain/reconstructionObligationLedgerSchemas.js";
import {
  androidApplicationProjectionInputSchema,
  androidApplicationProjectionResultSchema,
} from "../domain/android/androidApplication.js";
import {
  appleApplicationProjectionInputSchema,
  appleApplicationProjectionResultSchema,
} from "../domain/apple/appleApplication.js";
import type { ToolContract } from "./toolContracts.js";
import { toolContractMetadata } from "./toolEffects.js";
import { evidenceResultOf } from "./toolOutputSchemas.js";
import {
  JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE,
  JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE,
  JAVASCRIPT_FEATURE_TRACE_EXAMPLE,
  SOURCE_TO_BUNDLE_COMPARISON_EXAMPLE,
} from "./javascript/javascriptApplicationWorkflowExamples.js";
import {
  ANDROID_APPLICATION_GRAPH_EXAMPLE,
  APPLE_APPLICATION_GRAPH_EXAMPLE,
  MACOS_APPLICATION_GRAPH_EXAMPLE,
} from "./mobileApplicationGraphExamples.js";

const traceOutputSchema = evidenceResultOf(applicationFeatureTraceResultSchema);
const semanticTraceOutputSchema = evidenceResultOf(
  javaScriptSemanticTraceResultSchema,
);
const comparisonOutputSchema = evidenceResultOf(
  applicationVersionComparisonResultSchema,
);
const sourceToBundleOutputSchema = evidenceResultOf(
  sourceToBundleComparisonResultSchema,
);
const exportShapeComparisonOutputSchema = evidenceResultOf(
  javaScriptExportShapeComparisonResultSchema,
);
const reconstructionObligationLedgerOutputSchema = evidenceResultOf(
  reconstructionObligationLedgerSchema,
);
const HASH = "0".repeat(64);
const retained = (evidence_id: string) => ({
  kind: "retained-evidence" as const,
  evidence_id,
});

/** Provider-neutral graph workflow contracts shared by MCP and CLI adapters. */
export const APPLICATION_TOOL_CONTRACTS = [
  {
    name: "trace_application_feature",
    ...toolContractMetadata("trace_application_feature"),
    description:
      "Trace a typed literal seed through every reachable part of an authenticated JavaScript Application Graph supplied as inline Evidence or exact same-session retained references. Original static, native, passive-runtime, inferred, and unknown authorities remain distinct; native addon handoffs never open a provider or execute the application.",
    kind: "application",
    inputSchema: traceApplicationFeatureRequestSchema,
    outputSchema: traceOutputSchema,
    examples: [
      {
        title: "Trace one module seed through a retained application graph",
        input: JAVASCRIPT_FEATURE_TRACE_EXAMPLE,
      },
      {
        title: "Use exact Evidence already retained in this session",
        input: {
          ...JAVASCRIPT_FEATURE_TRACE_EXAMPLE,
          application: retained(
            JAVASCRIPT_FEATURE_TRACE_EXAMPLE.application.evidence_id,
          ),
        },
      },
    ],
  },
  {
    name: "trace_javascript_semantics",
    ...toolContractMetadata("trace_javascript_semantics"),
    description:
      "Trace static JavaScript data-flow, direct call/return, and closure relations from inline application Evidence or an exact same-session retained reference. Dynamic or unsupported semantics remain explicit unknowns; static reachability never claims runtime execution.",
    kind: "application",
    inputSchema: traceJavaScriptSemanticsRequestSchema,
    outputSchema: semanticTraceOutputSchema,
    examples: [
      {
        title: "Trace backward provenance from one semantic node",
        input: {
          application: JAVASCRIPT_FEATURE_TRACE_EXAMPLE.application,
          query: {
            seed: { kind: "semantic-node", node_id: `jsrg_node_${HASH}` },
            direction: "backward-provenance",
          },
        },
      },
    ],
  },
  {
    name: "compare_application_versions",
    ...toolContractMetadata("compare_application_versions"),
    description:
      "Compare two authenticated JavaScript Application Graph versions supplied as inline Evidence or exact same-session retained references. Uses unique-only exact digest, module source digest, source-map identity, structural fingerprint, and non-module semantic-key tiers. Reports added, removed, changed, ambiguous, and unknown entities plus the complete matching changed_from graph without fuzzy or module-ordinal pairing.",
    kind: "application",
    inputSchema: compareApplicationVersionsRequestSchema,
    outputSchema: comparisonOutputSchema,
    examples: [
      {
        title: "Compare authenticated static and reconciled application graphs",
        input: JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE,
      },
      {
        title: "Use exact Evidence already retained in this session",
        input: {
          ...JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE,
          left: retained(
            JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE.left.evidence_id,
          ),
          right: retained(
            JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE.right.evidence_id,
          ),
        },
      },
    ],
  },
  {
    name: "compare_source_to_bundle",
    ...toolContractMetadata("compare_source_to_bundle"),
    description:
      "Compare a cryptographically committed HistoricalSourceGraph with authenticated JavaScript Application Graph Evidence supplied inline or by exact same-session retained reference. Uses explicit exact-digest, source-map path, current-path, suffix, and basename signals with stable weights. Classifies unchanged, modified, removed, split, merged, duplicated, and unknown; incomplete coverage and ambiguous weak signals never become absence or forced matches.",
    kind: "application",
    inputSchema: compareSourceToBundleRequestSchema,
    outputSchema: sourceToBundleOutputSchema,
    examples: [
      {
        title:
          "Compare committed historical source with a shipped bundle graph",
        input: SOURCE_TO_BUNDLE_COMPARISON_EXAMPLE,
      },
    ],
  },
  {
    name: "compare_javascript_export_shapes",
    ...toolContractMetadata("compare_javascript_export_shapes"),
    description:
      "Compare static return shapes for one exact module/export selector on each authenticated JavaScript Application Graph supplied as inline Evidence or exact same-session retained references. Variants pair only by reciprocal unique literal discriminants; dynamic values, incomplete properties, and ambiguous variants remain unknown. Reports JSON Pointer changes without executing JavaScript; runtime behavior requires a separate agent-run probe.",
    kind: "application",
    inputSchema: compareJavaScriptExportShapesRequestSchema,
    outputSchema: exportShapeComparisonOutputSchema,
    examples: [
      {
        title: "Compare one exact parser export without execution",
        input: JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE,
      },
      {
        title: "Use exact Evidence already retained in this session",
        input: {
          ...JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE,
          left: retained(
            JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE.left.evidence_id,
          ),
          right: retained(
            JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE.right.evidence_id,
          ),
        },
      },
    ],
  },
  {
    name: "build_reconstruction_obligation_ledger",
    ...toolContractMetadata("build_reconstruction_obligation_ledger"),
    description:
      "Generate the complete deterministic ReconstructionObligationLedger from an authenticated Evidence bundle, reviewed obligations, and an explicit reconstruction manifest. Static candidates remain candidates; duplicate ownership, missing original or reconstruction cases, missing parser/type, weak verifier authority, unenumerated claims, contradictions, dependencies, and residual unknowns fail closed. The inline result carries the full-ledger closure digest and typed per-obligation diagnostics.",
    kind: "application",
    inputSchema: reconstructionObligationLedgerInputSchema,
    outputSchema: reconstructionObligationLedgerOutputSchema,
    examples: [
      {
        title: "Generate the complete obligation ledger",
        input: {
          evidence_bundle: {
            artifacts: [],
            providers: [],
            environments: [],
            scenarios: [],
            captures: [],
            unknowns: [],
            records: [],
          },
          reviewed_obligations: [],
          manifest: {
            bindings: [],
            contradictions: [],
          },
        },
      },
    ],
  },
  {
    name: "evaluate_reconstruction_coverage",
    ...toolContractMetadata("evaluate_reconstruction_coverage"),
    description:
      "Evaluate inline evidence-backed reconstruction coverage against one named boundary. Missing ownership or inventory is partial; stale, weak, truncated, skipped, or unresolved proof is unknown; contradictions, failed proof, missing owners, and authority routing fail closed.",
    kind: "application",
    inputSchema: reconstructionCoverageEvaluationInputSchema,
    outputSchema: reconstructionClosureResultSchema,
    examples: [
      {
        title: "Evaluate one replacement boundary",
        input: {
          coverage: {
            evidence_bundle: {
              artifacts: [],
              providers: [],
              environments: [],
              scenarios: [],
              captures: [],
              unknowns: [],
              records: [],
            },
            artifacts: [],
            surfaces: [],
            owners: [],
            claims: [],
            verifier_contracts: [],
            verifier_results: [],
            residual_unknown_ids: [],
            contradictions: [],
            package_proofs: [],
            boundaries: [
              {
                boundary_id: "replacement.cli",
                title: "CLI replacement",
                required_surface_ids: ["cli.help"],
                required_claim_ids: ["claim.cli.help"],
                required_package_proof_kinds: [
                  "clean-install",
                  "authority-independence",
                ],
                allowed_dispositions: [],
                allowed_unknown_ids: [],
              },
            ],
          },
          boundary_id: "replacement.cli",
        },
      },
    ],
  },
  {
    name: "project_android_application_graph",
    ...toolContractMetadata("project_android_application_graph"),
    description:
      "Project authenticated APK inventory_artifact Evidence into an execution-free Android application inventory. Reports exact component paths and hashes, runtime-family hints, and path-based bridge hypotheses without decoding DEX, executing the APK, or claiming observed runtime calls.",
    kind: "application",
    inputSchema: androidApplicationProjectionInputSchema,
    outputSchema: evidenceResultOf(androidApplicationProjectionResultSchema),
    examples: [
      {
        title:
          "Project APK inventory Evidence into an Android application graph",
        input: ANDROID_APPLICATION_GRAPH_EXAMPLE,
      },
    ],
  },
  {
    name: "project_apple_application_graph",
    ...toolContractMetadata("project_apple_application_graph"),
    description:
      "Project authenticated IPA, macOS .app directory, ZIP, or DMG inventory Evidence into an execution-free Apple application inventory. Reports application roots, nested bundles with path-convention roles (app extensions, XPC services, login items, privileged helpers, system extensions, frameworks), launchd plists, exact component paths and hashes, runtime-family hints, and path-based bridge hypotheses without parsing plist/CMS semantics or claiming observed runtime calls.",
    kind: "application",
    inputSchema: appleApplicationProjectionInputSchema,
    outputSchema: evidenceResultOf(appleApplicationProjectionResultSchema),
    examples: [
      {
        title: "Project IPA inventory Evidence into an Apple application graph",
        input: APPLE_APPLICATION_GRAPH_EXAMPLE,
      },
      {
        title:
          "Project a macOS .app directory inventory into its bundle anatomy",
        input: MACOS_APPLICATION_GRAPH_EXAMPLE,
      },
    ],
  },
  {
    name: "inspect_game_project",
    ...toolContractMetadata("inspect_game_project"),
    description:
      "Inspect an explicit local game project without running its editor or changing assets. Initial profile: Unity Assets/ProjectSettings. Returns exact case-collision groups, duplicate/invalid/missing meta facts, serialized build-scene paths and unresolved Assets-index script GUIDs, plus located C# stub/lifecycle candidates as heuristic inferences. Includes inspected-text SHA-256 identities, coverage and every skipped path. Defaults bound traversal to 100000 entries, retained/read selected text to 64 MiB and each file to 8 MiB; caller may change these budgets. Does not recover native method bodies, resolve Packages/binary serialization, compile or establish playability.",
    kind: "application",
    inputSchema: gameProjectInputSchema,
    outputSchema: evidenceResultOf(gameProjectReportSchema),
    examples: [
      {
        title: "Inspect a Unity project exported from game artifacts",
        input: { path: "/artifacts/RecoveredGame" },
      },
    ],
  },
] as const satisfies readonly ToolContract[];

/** Resolve one named application contract without relying on array position. */
export function applicationToolContract(
  name: "trace_application_feature",
): (typeof APPLICATION_TOOL_CONTRACTS)[0];
export function applicationToolContract(
  name: "trace_javascript_semantics",
): (typeof APPLICATION_TOOL_CONTRACTS)[1];
export function applicationToolContract(
  name: "compare_application_versions",
): (typeof APPLICATION_TOOL_CONTRACTS)[2];
export function applicationToolContract(
  name: "compare_source_to_bundle",
): (typeof APPLICATION_TOOL_CONTRACTS)[3];
export function applicationToolContract(
  name: "compare_javascript_export_shapes",
): (typeof APPLICATION_TOOL_CONTRACTS)[4];
export function applicationToolContract(
  name: "build_reconstruction_obligation_ledger",
): (typeof APPLICATION_TOOL_CONTRACTS)[5];
export function applicationToolContract(
  name: "evaluate_reconstruction_coverage",
): (typeof APPLICATION_TOOL_CONTRACTS)[6];
export function applicationToolContract(
  name: "project_android_application_graph",
): (typeof APPLICATION_TOOL_CONTRACTS)[7];
export function applicationToolContract(
  name: "project_apple_application_graph",
): (typeof APPLICATION_TOOL_CONTRACTS)[8];
export function applicationToolContract(
  name: "inspect_game_project",
): Extract<
  (typeof APPLICATION_TOOL_CONTRACTS)[number],
  { readonly name: "inspect_game_project" }
>;
export function applicationToolContract(
  name: (typeof APPLICATION_TOOL_CONTRACTS)[number]["name"],
): (typeof APPLICATION_TOOL_CONTRACTS)[number] {
  const contract = APPLICATION_TOOL_CONTRACTS.find(
    ({ name: candidate }) => candidate === name,
  );
  if (contract === undefined)
    throw new Error(`Missing application tool contract: ${name}`);
  return contract;
}
