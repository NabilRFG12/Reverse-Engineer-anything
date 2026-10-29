/** Possible effects across a tool's supported inputs, including temporary work. */
export interface ToolEffects {
  readonly mutatesTarget: boolean;
  /** Includes additive Evidence recording, navigation state, and unknown updates. */
  readonly mutatesSession: boolean;
  readonly writesFilesystem: boolean;
  readonly launchesProcess: boolean;
  readonly accessesNetwork: boolean;
  readonly changesUiState: boolean;
  readonly mayDiscardData: boolean;
  readonly idempotent: boolean;
}

/** MCP execution hints derived only from canonical effects. */
export interface DerivedToolAnnotations {
  readonly readOnlyHint: boolean;
  readonly destructiveHint: boolean;
  readonly idempotentHint: boolean;
  readonly openWorldHint: boolean;
}

const effects = (overrides: Partial<ToolEffects> = {}): ToolEffects => ({
  mutatesTarget: false,
  mutatesSession: false,
  writesFilesystem: false,
  launchesProcess: false,
  accessesNetwork: false,
  changesUiState: false,
  mayDiscardData: false,
  idempotent: true,
  ...overrides,
});

const evidence = effects({ mutatesSession: true });
const nativeEvidence = effects({ mutatesSession: true, launchesProcess: true });
const browserEvidence = effects({
  mutatesSession: true,
  accessesNetwork: true,
});
const sessionEvidence = effects({ mutatesSession: true });

/** Explicit effect audit for every public tool. */
export const TOOL_EFFECTS: Readonly<Record<string, ToolEffects>> = {
  inspect_game_project: evidence,
  inspect_evm_interface: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
  }),
  inspect_web_network_capture: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
  }),
  observe_web_execution: effects({
    mutatesTarget: true,
    mutatesSession: true,
    accessesNetwork: true,
    mayDiscardData: true,
    idempotent: false,
  }),
  inspect_web_event_listeners: browserEvidence,
  trace_web_source_location: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
  }),
  trace_web_module_imports: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
    accessesNetwork: true,
  }),
  inspect_recorded_crash: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
  }),
  inspect_binary_layout: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
  }),
  inspect_firmware_regions: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  extract_firmware: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
    idempotent: false,
  }),
  inspect_android_package: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  search_android_classes: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  inspect_android_class: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  inspect_android_method: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  trace_android_references: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  annotate_native_function: effects({
    mutatesTarget: true,
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  inspect_native_load_image: evidence,
  inspect_native_dispatch_metadata: evidence,
  trace_native_ui_action: evidence,
  trace_native_values: evidence,
  address_name: evidence,
  comment: evidence,
  current_address: evidence,
  current_procedure: evidence,
  current_document: evidence,
  goto_address: effects({ mutatesSession: true, changesUiState: true }),
  inline_comment: evidence,
  list_bookmarks: evidence,
  list_documents: evidence,
  list_names: evidence,
  list_procedures: evidence,
  list_segments: evidence,
  list_strings: evidence,
  next_address: evidence,
  prev_address: evidence,
  procedure_address: evidence,
  procedure_assembly: evidence,
  procedure_callees: evidence,
  procedure_callers: evidence,
  procedure_info: evidence,
  read_function_instructions: evidence,
  inspect_native_instruction: evidence,
  inspect_native_data_type: evidence,
  resolve_native_call_targets: evidence,
  read_bytes: evidence,
  address_to_file_offset: evidence,
  procedure_references: evidence,
  procedure_pseudo_code: evidence,
  resolve_containing_procedure: evidence,
  search_procedures: evidence,
  search_strings: evidence,
  set_address_name: effects({ mutatesTarget: true, mutatesSession: true }),
  set_addresses_names: effects({ mutatesTarget: true, mutatesSession: true }),
  set_bookmark: effects({ mutatesTarget: true, mutatesSession: true }),
  set_comment: effects({ mutatesTarget: true, mutatesSession: true }),
  set_inline_comment: effects({ mutatesTarget: true, mutatesSession: true }),
  unset_bookmark: effects({
    mutatesTarget: true,
    mutatesSession: true,
    mayDiscardData: true,
  }),
  xrefs: evidence,
  get_objc_classes: evidence,
  get_objc_protocols: evidence,
  batch_decompile: evidence,
  get_call_graph: evidence,
  analyze_swift_types: evidence,
  find_xrefs_to_name: evidence,
  binary_overview: evidence,
  analyze_function: evidence,
  inspect_native_api: effects({ mutatesSession: true, idempotent: false }),
  trace_feature: effects({ mutatesSession: true, idempotent: false }),
  trace_call_path: effects({ mutatesSession: true, idempotent: false }),
  observe_native_ui: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  capture_native_ui_scenario: effects({
    writesFilesystem: true,
    mutatesTarget: true,
    mutatesSession: true,
    launchesProcess: true,
    accessesNetwork: true,
    changesUiState: true,
    mayDiscardData: true,
    idempotent: false,
  }),
  // The owned process can change files, show UI and use the network.
  observe_native_calls: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
    accessesNetwork: true,
    changesUiState: true,
    idempotent: false,
  }),
  inspect_macho: nativeEvidence,
  inspect_signature: nativeEvidence,
  inspect_plist: nativeEvidence,
  list_architectures: nativeEvidence,
  demangle_swift: nativeEvidence,
  inspect_artifact: effects({
    mutatesSession: true,
    launchesProcess: true,
    writesFilesystem: true,
  }),
  extract_artifact: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
    idempotent: false,
  }),
  decode_interface_builder: evidence,
  inspect_asset_catalog: nativeEvidence,
  inspect_keyed_archive: evidence,
  trace_dylib_resolution: evidence,
  inspect_managed_artifact: evidence,
  inspect_managed_members: evidence,
  inspect_managed_native_boundaries: evidence,
  compare_managed_members: sessionEvidence,
  verify_managed_native_boundaries: sessionEvidence,
  import_managed_reconstruction: sessionEvidence,
  project_managed_application_graph: sessionEvidence,
  list_browser_targets: browserEvidence,
  inspect_web_page: browserEvidence,
  analyze_web_bundle: browserEvidence,
  observe_web_session: browserEvidence,
  discover_webmcp_tools: browserEvidence,
  compare_web_captures: sessionEvidence,
  capture_web_screenshot: browserEvidence,
  compare_web_screenshots: sessionEvidence,
  capture_browser_scenario: effects({
    mutatesTarget: true,
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
    accessesNetwork: true,
    changesUiState: true,
    mayDiscardData: true,
    idempotent: false,
  }),
  list_electron_targets: browserEvidence,
  inspect_electron_page: browserEvidence,
  capture_electron_scenario: effects({
    mutatesTarget: true,
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
    accessesNetwork: true,
    changesUiState: true,
    mayDiscardData: true,
    idempotent: false,
  }),
  list_javascript_runtime_targets: browserEvidence,
  observe_javascript_runtime: browserEvidence,
  analyze_javascript_application: evidence,
  export_web_scripts: effects({
    mutatesSession: true,
    writesFilesystem: true,
    idempotent: false,
  }),
  reconcile_javascript_runtime: evidence,
  recover_javascript_sources: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
    idempotent: false,
  }),
  trace_application_feature: evidence,
  trace_javascript_semantics: evidence,
  compare_application_versions: evidence,
  compare_source_to_bundle: evidence,
  compare_javascript_export_shapes: evidence,
  build_reconstruction_obligation_ledger: evidence,
  evaluate_reconstruction_coverage: effects(),
  project_android_application_graph: evidence,
  project_apple_application_graph: evidence,
  open_binary: effects({ mutatesSession: true, launchesProcess: true }),
  close_binary: effects({
    mutatesSession: true,
    writesFilesystem: true,
    mayDiscardData: true,
    idempotent: false,
  }),
  binary_session: effects(),
  export_evidence_bundle: effects({
    writesFilesystem: true,
    mayDiscardData: true,
  }),
  get_evidence_bundle: effects(),
  get_navigation_context: effects({ mutatesSession: true }),
  inspect_address_context: effects({ mutatesSession: true }),
  import_evidence_bundle: effects({ mutatesSession: true }),
  capture_process_scenario: effects({
    mutatesSession: true,
    writesFilesystem: true,
    launchesProcess: true,
    accessesNetwork: true,
    idempotent: false,
  }),
  compare_process_captures: sessionEvidence,
  compare_artifacts: sessionEvidence,
  compare_functions: sessionEvidence,
  compare_bundles: effects({ mutatesSession: true }),
  find_changed_behavior: sessionEvidence,
  build_call_path: sessionEvidence,
  correlate_static_and_runtime: sessionEvidence,
  verify_reconstruction: sessionEvidence,
  list_unknowns: effects(),
  record_unknown: effects({ mutatesSession: true, idempotent: false }),
  update_unknown: effects({ mutatesSession: true, idempotent: false }),
  verify_unknown_resolution: effects(),
};

/** Derive MCP annotations without tool-name or tool-family heuristics. */
export const annotationsFromEffects = (
  value: ToolEffects,
): DerivedToolAnnotations => ({
  readOnlyHint: !(
    value.mutatesTarget ||
    value.mutatesSession ||
    value.writesFilesystem ||
    value.launchesProcess ||
    value.accessesNetwork ||
    value.changesUiState ||
    value.mayDiscardData
  ),
  destructiveHint: value.mayDiscardData,
  idempotentHint: value.idempotent,
  openWorldHint: value.launchesProcess || value.accessesNetwork,
});

/** Resolve the audited metadata for one public tool. */
export const toolContractMetadata = (name: string) => {
  const audited = TOOL_EFFECTS[name];
  if (audited === undefined)
    throw new Error(`Missing effect audit for ${name}`);
  return {
    title: name
      .split("_")
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(" "),
    effects: audited,
    annotations: annotationsFromEffects(audited),
  };
};
