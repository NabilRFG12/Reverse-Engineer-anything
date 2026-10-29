import { EVM_TOOL_CONTRACTS } from "./evm/evmToolContracts.js";
import { BINARY_DIAGNOSTICS_TOOL_CONTRACTS } from "./native/binaryDiagnosticsToolContracts.js";
import { describe, expect, it } from "vitest";

import { ENHANCED_TOOL_CONTRACTS } from "./enhancedToolContracts.js";
import { OFFICIAL_TOOL_CONTRACTS } from "./officialToolContracts.js";
import { SESSION_TOOL_CONTRACTS } from "./sessionToolContracts.js";
import { TOOL_CONTRACTS } from "./toolContracts.js";
import { ARTIFACT_TOOL_CONTRACTS } from "./artifactToolContracts.js";
import { MANAGED_TOOL_CONTRACTS } from "./managed/managedToolContracts.js";
import { FIRMWARE_TOOL_CONTRACTS } from "./firmware/firmwareToolContracts.js";
import { ANDROID_TOOL_CONTRACTS } from "./android/androidToolContracts.js";
import { MANAGED_WORKFLOW_TOOL_CONTRACTS } from "./managed/managedWorkflowToolContracts.js";
import { NATIVE_TOOL_CONTRACTS } from "./native/nativeToolContracts.js";
import { BROWSER_PROVIDER_TOOL_CONTRACTS } from "./browserProviderToolContracts.js";
import { ELECTRON_TOOL_CONTRACTS } from "./javascript/electronToolContracts.js";
import { JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS } from "./javascript/javascriptRuntimeObservationToolContracts.js";
import { APPLICATION_TOOL_CONTRACTS } from "./applicationToolContracts.js";
import { JAVASCRIPT_RECOVERY_TOOL_CONTRACTS } from "./javascript/javascriptRecoveryToolContracts.js";
import { WEB_SCRIPT_TOOL_CONTRACTS } from "./webScriptToolContracts.js";
import { WEB_RUNTIME_TOOL_CONTRACTS } from "./webRuntimeToolContracts.js";
import { WEB_NETWORK_CAPTURE_TOOL_CONTRACTS } from "./webNetworkCaptureToolContracts.js";

const GROUPS = {
  official: OFFICIAL_TOOL_CONTRACTS,
  enhanced: ENHANCED_TOOL_CONTRACTS,
  native: NATIVE_TOOL_CONTRACTS,
  binary_diagnostics: BINARY_DIAGNOSTICS_TOOL_CONTRACTS,
  artifact: ARTIFACT_TOOL_CONTRACTS,
  evm: EVM_TOOL_CONTRACTS,
  managed: MANAGED_TOOL_CONTRACTS,
  android: ANDROID_TOOL_CONTRACTS,
  firmware: FIRMWARE_TOOL_CONTRACTS,
  managed_workflow: MANAGED_WORKFLOW_TOOL_CONTRACTS,
  browser_provider: BROWSER_PROVIDER_TOOL_CONTRACTS,
  electron: ELECTRON_TOOL_CONTRACTS,
  javascript_runtime_observation: JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS,
  application: APPLICATION_TOOL_CONTRACTS,
  javascript_recovery: JAVASCRIPT_RECOVERY_TOOL_CONTRACTS,
  web_script_export: WEB_SCRIPT_TOOL_CONTRACTS,
  web_runtime: WEB_RUNTIME_TOOL_CONTRACTS,
  web_network_capture: WEB_NETWORK_CAPTURE_TOOL_CONTRACTS,
  session: SESSION_TOOL_CONTRACTS,
} as const;

/**
 * Published tool names that must remain in the inventory.
 *
 * This is a floor, not an equality. Structural invariants already prove every
 * group member is published, so on their own a contract removed from both its
 * group and the aggregate would regenerate the catalog with no failing test.
 * These names catch that removal. Adding a tool needs no edit here; removing
 * one is a deliberate API change that must delete its name deliberately.
 */
const PUBLISHED_TOOL_NAME_FLOOR = [
  "address_name",
  "address_to_file_offset",
  "analyze_function",
  "analyze_javascript_application",
  "analyze_swift_types",
  "analyze_web_bundle",
  "batch_decompile",
  "binary_overview",
  "binary_session",
  "build_call_path",
  "build_reconstruction_obligation_ledger",
  "capture_browser_scenario",
  "capture_electron_scenario",
  "capture_process_scenario",
  "capture_web_screenshot",
  "close_binary",
  "comment",
  "compare_application_versions",
  "compare_artifacts",
  "compare_bundles",
  "compare_functions",
  "compare_javascript_export_shapes",
  "compare_managed_members",
  "compare_process_captures",
  "compare_source_to_bundle",
  "compare_web_captures",
  "compare_web_screenshots",
  "correlate_static_and_runtime",
  "current_address",
  "current_document",
  "current_procedure",
  "decode_interface_builder",
  "demangle_swift",
  "discover_webmcp_tools",
  "evaluate_reconstruction_coverage",
  "export_evidence_bundle",
  "extract_artifact",
  "export_web_scripts",
  "trace_web_module_imports",
  "trace_web_source_location",
  "observe_web_execution",
  "inspect_web_event_listeners",
  "find_changed_behavior",
  "find_xrefs_to_name",
  "get_call_graph",
  "get_evidence_bundle",
  "get_navigation_context",
  "get_objc_classes",
  "get_objc_protocols",
  "goto_address",
  "import_evidence_bundle",
  "import_managed_reconstruction",
  "inline_comment",
  "inspect_address_context",
  "inspect_artifact",
  "inspect_game_project",
  "inspect_asset_catalog",
  "inspect_electron_page",
  "inspect_macho",
  "inspect_managed_artifact",
  "inspect_firmware_regions",
  "extract_firmware",
  "inspect_android_package",
  "search_android_classes",
  "inspect_android_class",
  "inspect_android_method",
  "trace_android_references",
  "inspect_managed_members",
  "inspect_managed_native_boundaries",
  "inspect_native_api",
  "inspect_native_dispatch_metadata",
  "inspect_plist",
  "inspect_signature",
  "inspect_web_page",
  "list_architectures",
  "list_bookmarks",
  "list_browser_targets",
  "list_documents",
  "list_electron_targets",
  "list_javascript_runtime_targets",
  "list_names",
  "list_procedures",
  "list_segments",
  "list_strings",
  "list_unknowns",
  "next_address",
  "observe_javascript_runtime",
  "observe_web_session",
  "open_binary",
  "prev_address",
  "procedure_address",
  "procedure_assembly",
  "procedure_callees",
  "procedure_callers",
  "procedure_info",
  "procedure_pseudo_code",
  "procedure_references",
  "project_android_application_graph",
  "project_apple_application_graph",
  "project_managed_application_graph",
  "read_bytes",
  "read_function_instructions",
  "reconcile_javascript_runtime",
  "record_unknown",
  "resolve_containing_procedure",
  "search_procedures",
  "search_strings",
  "set_address_name",
  "set_addresses_names",
  "set_bookmark",
  "set_comment",
  "set_inline_comment",
  "trace_application_feature",
  "trace_call_path",
  "trace_feature",
  "trace_javascript_semantics",
  "trace_native_ui_action",
  "unset_bookmark",
  "update_unknown",
  "verify_managed_native_boundaries",
  "verify_reconstruction",
  "verify_unknown_resolution",
  "xrefs",
] as const;

// These assertions are deliberately structural rather than numeric. Pinning
// group sizes made every additive catalog change require a test edit, which
// blocked additive change without catching defects. Removal is still covered:
// the floor above catches a contract dropped from both its group and the
// aggregate.
describe("tool contract inventory", () => {
  it("assigns every published tool a unique name", () => {
    const names = TOOL_CONTRACTS.map(({ name }) => name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("contains every group member in the published inventory", () => {
    const published = new Set(TOOL_CONTRACTS.map(({ name }) => name));
    for (const [group, contracts] of Object.entries(GROUPS)) {
      for (const { name } of contracts) {
        expect(
          published.has(name),
          `${group} tool ${name} is not in TOOL_CONTRACTS`,
        ).toBe(true);
      }
    }
  });

  it("keeps every published tool name in the declared floor", () => {
    const published = new Set(TOOL_CONTRACTS.map(({ name }) => name));
    const removed = PUBLISHED_TOOL_NAME_FLOOR.filter(
      (name) => !published.has(name),
    );
    expect(
      removed,
      "published tool names were removed; deleting one is a deliberate API change",
    ).toEqual([]);
  });

  it("keeps groups mutually disjoint", () => {
    const entries = Object.entries(GROUPS);
    for (const [leftName, left] of entries) {
      for (const [rightName, right] of entries) {
        if (leftName >= rightName) continue;
        const rightNames = new Set(right.map(({ name }) => name));
        const overlap = left
          .map(({ name }) => name)
          .filter((name) => rightNames.has(name));
        expect(
          overlap,
          `${leftName} and ${rightName} both publish ${overlap.join(", ")}`,
        ).toEqual([]);
      }
    }
  });

  it("publishes a non-empty inventory from every group", () => {
    for (const [group, contracts] of Object.entries(GROUPS)) {
      expect(contracts.length, `${group} is empty`).toBeGreaterThan(0);
    }
  });
});
