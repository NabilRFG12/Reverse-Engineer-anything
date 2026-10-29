import { names } from "./catalog-core.mjs";

/** Build tool-family counts and sorted tool-name lists. */
export const toolFamilyCatalog = (sources) => {
  const families = [
    {
      id: "direct",
      surface: "official-proxy",
      contracts: sources.officialContracts.OFFICIAL_TOOL_CONTRACTS,
    },
    {
      id: "enhanced",
      surface: "enhanced",
      contracts: sources.enhancedContracts.ENHANCED_TOOL_CONTRACTS,
    },
    {
      id: "native",
      surface: "native-provider",
      contracts: [
        ...sources.nativeContracts.NATIVE_TOOL_CONTRACTS,
        ...sources.binaryDiagnosticsContracts.BINARY_DIAGNOSTICS_TOOL_CONTRACTS,
      ],
    },
    {
      id: "artifact",
      surface: "artifact-provider",
      contracts: [
        ...sources.artifactContracts.ARTIFACT_TOOL_CONTRACTS,
        ...sources.evmContracts.EVM_TOOL_CONTRACTS,
      ],
    },
    {
      id: "managed",
      surface: "managed",
      contracts: [
        ...sources.managedContracts.MANAGED_TOOL_CONTRACTS,
        ...sources.managedWorkflowContracts.MANAGED_WORKFLOW_TOOL_CONTRACTS,
      ],
    },
    {
      id: "firmware",
      surface: "firmware-provider",
      contracts: sources.firmwareContracts.FIRMWARE_TOOL_CONTRACTS,
    },
    {
      id: "android",
      surface: "android-provider",
      contracts: sources.androidContracts.ANDROID_TOOL_CONTRACTS,
    },
    {
      id: "browser",
      surface: "browser-provider",
      contracts: [
        ...sources.browserContracts.BROWSER_TOOL_CONTRACTS,
        ...sources.webRuntimeContracts.WEB_RUNTIME_TOOL_CONTRACTS,
        ...sources.browserScenarioContracts.BROWSER_SCENARIO_TOOL_CONTRACTS,
        ...sources.webNetworkCaptureContracts
          .WEB_NETWORK_CAPTURE_TOOL_CONTRACTS,
      ],
    },
    {
      id: "electron",
      surface: "electron-provider",
      contracts: sources.electronContracts.ELECTRON_TOOL_CONTRACTS,
    },
    {
      id: "javascript-runtime",
      surface: "runtime-provider",
      contracts:
        sources.javascriptRuntimeObservationContracts
          .JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS,
    },
    {
      id: "application",
      surface: "application-workflow",
      contracts: [
        ...sources.applicationContracts.APPLICATION_TOOL_CONTRACTS,
        ...sources.webScriptContracts.WEB_SCRIPT_TOOL_CONTRACTS,
        ...sources.javascriptRecoveryContracts
          .JAVASCRIPT_RECOVERY_TOOL_CONTRACTS,
      ],
    },
    {
      id: "session",
      surface: "session",
      contracts: sources.sessionContracts.SESSION_TOOL_CONTRACTS,
    },
  ].map(({ id, surface, contracts }) => ({
    id,
    surface,
    count: contracts.length,
    tools: names(contracts),
  }));
  const familyTotal = families.reduce(
    (total, family) => total + family.count,
    0,
  );
  if (
    familyTotal !== sources.toolContracts.TOOL_CONTRACTS.length ||
    familyTotal !== sources.catalogIdentity.CATALOG_IDENTITY.counts.mcp_tools
  )
    throw new Error("Tool family inventory does not match TOOL_CONTRACTS");
  return { total: familyTotal, families };
};

/** Build provider identities with their sorted capability names. */
export const providerCatalog = (sources) => {
  const contractsByName = new Map(
    sources.toolContracts.TOOL_CONTRACTS.map((contract) => [
      contract.name,
      contract,
    ]),
  );
  const declaredContracts = (providerId, operations) =>
    operations.map((operation) => {
      const contract = contractsByName.get(operation);
      if (contract === undefined)
        throw new TypeError(
          `Provider ${providerId} declares an unknown analyst operation: ${operation}`,
        );
      return contract;
    });
  const {
    applicationContracts,
    reconciliationContracts,
    observationContracts,
    activeContracts,
  } = electronContractSlices(sources);
  return [
    {
      identity: sources.hopperProvider.HOPPER_PROVIDER_IDENTITY,
      contracts: declaredContracts(
        "hopper",
        sources.hopperProvider.HOPPER_OPERATIONS,
      ),
    },
    {
      identity: sources.ghidraProvider.GHIDRA_PROVIDER_IDENTITY,
      contracts: declaredContracts(
        "ghidra",
        sources.ghidraProvider.GHIDRA_OPERATIONS,
      ),
    },
    {
      identity: sources.idaProvider.IDA_PROVIDER_IDENTITY,
      contracts: declaredContracts("ida", sources.idaProvider.IDA_OPERATIONS),
    },
    {
      identity: sources.nativeProvider.NATIVE_MACOS_PROVIDER_IDENTITY,
      contracts: sources.nativeContracts.NATIVE_TOOL_CONTRACTS,
    },
    {
      identity: sources.pwntoolsProvider.PWNTOOLS_PROVIDER_IDENTITY,
      contracts:
        sources.binaryDiagnosticsContracts.BINARY_DIAGNOSTICS_TOOL_CONTRACTS,
    },
    {
      identity: sources.evmProvider.EVMOLE_PROVIDER_IDENTITY,
      contracts: sources.evmContracts.EVM_TOOL_CONTRACTS,
    },
    {
      identity: sources.artifactProviders.ARTIFACT_GRAPH_PROVIDER,
      contracts: sources.artifactContracts.ARTIFACT_TOOL_CONTRACTS,
    },
    {
      identity: sources.artifactProviders.MANAGED_STATIC_PROVIDER,
      contracts: sources.managedContracts.MANAGED_TOOL_CONTRACTS,
    },
    {
      identity: sources.artifactProviders.MANAGED_WORKFLOW_PROVIDER,
      contracts:
        sources.managedWorkflowContracts.MANAGED_WORKFLOW_TOOL_CONTRACTS,
    },
    {
      identity: sources.firmwareProvider.BINWALK_PROVIDER_IDENTITY,
      contracts: sources.firmwareContracts.FIRMWARE_TOOL_CONTRACTS.filter(
        ({ name }) => name === "inspect_firmware_regions",
      ),
    },
    {
      identity: sources.firmwareProvider.UNBLOB_PROVIDER_IDENTITY,
      contracts: sources.firmwareContracts.FIRMWARE_TOOL_CONTRACTS.filter(
        ({ name }) => name === "extract_firmware",
      ),
    },
    {
      identity: sources.androidProvider.JADX_PROVIDER_IDENTITY,
      contracts: sources.androidContracts.ANDROID_TOOL_CONTRACTS,
    },
    {
      identity: sources.webNetworkCaptureProvider.HAR_CAPTURE_PROVIDER_IDENTITY,
      contracts:
        sources.webNetworkCaptureContracts.WEB_NETWORK_CAPTURE_TOOL_CONTRACTS,
    },
    {
      identity:
        sources.webNetworkCaptureProvider.MITMPROXY_CAPTURE_PROVIDER_IDENTITY,
      contracts:
        sources.webNetworkCaptureContracts.WEB_NETWORK_CAPTURE_TOOL_CONTRACTS,
    },
    {
      identity: sources.browserProvider.CDP_BROWSER_PROVIDER_IDENTITY,
      contracts: [
        ...sources.browserContracts.BROWSER_TOOL_CONTRACTS,
        ...sources.webRuntimeContracts.WEB_RUNTIME_TOOL_CONTRACTS,
      ],
    },
    {
      identity:
        sources.browserScenarioProvider
          .PLAYWRIGHT_BROWSER_SCENARIO_PROVIDER_IDENTITY,
      contracts:
        sources.browserScenarioContracts.BROWSER_SCENARIO_TOOL_CONTRACTS,
    },
    {
      identity: sources.electronProvider.CDP_ELECTRON_PROVIDER_IDENTITY,
      contracts: observationContracts,
    },
    {
      identity:
        sources.electronActiveProvider
          .PLAYWRIGHT_ELECTRON_ACTIVE_PROVIDER_IDENTITY,
      contracts: activeContracts,
    },
    {
      identity: sources.v8InspectorProvider.V8_INSPECTOR_PROVIDER_IDENTITY,
      contracts:
        sources.javascriptRuntimeObservationContracts
          .JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS,
    },
    {
      identity: sources.artifactProviders.JAVASCRIPT_APPLICATION_PROVIDER,
      contracts: applicationContracts,
    },
    {
      identity:
        sources.artifactProviders.JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER,
      contracts: reconciliationContracts,
    },
    {
      identity:
        sources.artifactProviders.JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER,
      contracts: sources.applicationContracts.APPLICATION_TOOL_CONTRACTS.filter(
        ({ name }) =>
          name !== "project_android_application_graph" &&
          name !== "project_apple_application_graph" &&
          name !== "inspect_game_project",
      ),
    },
    {
      identity: sources.gameProject.GAME_PROJECT_PROVIDER,
      contracts: sources.applicationContracts.APPLICATION_TOOL_CONTRACTS.filter(
        ({ name }) => name === "inspect_game_project",
      ),
    },
    {
      identity: sources.artifactProviders.ANDROID_APPLICATION_PROVIDER,
      contracts: sources.applicationContracts.APPLICATION_TOOL_CONTRACTS.filter(
        ({ name }) => name === "project_android_application_graph",
      ),
    },
    {
      identity: sources.artifactProviders.APPLE_APPLICATION_PROVIDER,
      contracts: sources.applicationContracts.APPLICATION_TOOL_CONTRACTS.filter(
        ({ name }) => name === "project_apple_application_graph",
      ),
    },
    {
      identity: sources.artifactProviders.WEB_SCRIPT_EXPORT_PROVIDER,
      contracts: sources.webScriptContracts.WEB_SCRIPT_TOOL_CONTRACTS,
    },
    {
      identity: sources.javascriptRecoveryProvider.WAKARU_PROVIDER_IDENTITY,
      contracts:
        sources.javascriptRecoveryContracts.JAVASCRIPT_RECOVERY_TOOL_CONTRACTS,
    },
  ]
    .map(({ identity, contracts }) => ({
      id: identity.id,
      name: identity.name,
      version: identity.version,
      capabilities: names(contracts),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
};

const electronContractSlices = (sources) => {
  const applicationContracts =
    sources.electronContracts.ELECTRON_TOOL_CONTRACTS.filter(
      ({ name }) => name === "analyze_javascript_application",
    );
  const reconciliationContracts =
    sources.electronContracts.ELECTRON_TOOL_CONTRACTS.filter(
      ({ name }) => name === "reconcile_javascript_runtime",
    );
  const observationContracts =
    sources.electronContracts.ELECTRON_TOOL_CONTRACTS.filter(
      ({ name }) =>
        name !== "analyze_javascript_application" &&
        name !== "reconcile_javascript_runtime" &&
        name !== "capture_electron_scenario",
    );
  const activeContracts =
    sources.electronContracts.ELECTRON_TOOL_CONTRACTS.filter(
      ({ name }) => name === "capture_electron_scenario",
    );
  if (
    applicationContracts.length !== 1 ||
    reconciliationContracts.length !== 1 ||
    observationContracts.length !== 2 ||
    activeContracts.length !== 1
  )
    throw new Error("Electron provider capability ownership drifted");
  return {
    applicationContracts,
    reconciliationContracts,
    observationContracts,
    activeContracts,
  };
};
