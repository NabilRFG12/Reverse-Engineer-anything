import type { EvmInterfaceService } from "../application/evm/EvmInterfaceService.js";
import { createGameProjectInspectionService } from "../composition/gameProject.js";
import { registerGameProjectTools } from "./registerGameProjectTools.js";
import { createEvmInterfaceService } from "../composition/evm.js";
import { registerEvmTools } from "./registerEvmTools.js";
import { registerRecordedCrashTools } from "./registerRecordedCrashTools.js";
import { createRecordedCrashService } from "../composition/binaryDiagnostics.js";
import type { RecordedCrashService } from "../application/binaryDiagnostics/RecordedCrashService.js";
import { registerBinaryDiagnosticsTools } from "./registerBinaryDiagnosticsTools.js";
import { createBinaryLayoutService } from "../composition/binaryDiagnostics.js";
import type { BinaryLayoutService } from "../application/binaryDiagnostics/BinaryLayoutService.js";
import { McpServer } from "@modelcontextprotocol/server";
import { isAbsolute } from "node:path";

import type { AnalysisOperationPort } from "../application/AnalysisProvider.js";
import type { BinarySessionPort } from "../application/binary/BinarySession.js";
import type { BrowserObservationPort } from "../application/BrowserObservationPort.js";
import type { BrowserScenarioCapturePort } from "../application/BrowserScenarioCapturePort.js";
import type { ElectronActiveObservationPort } from "../application/javascript/ElectronActiveObservationPort.js";
import type { ElectronObservationPort } from "../application/javascript/ElectronObservationPort.js";
import type { JavaScriptRuntimeObservationPort } from "../application/javascript/JavaScriptRuntimeObservationPort.js";
import type { OptionalProviderLoadFailures } from "../application/OptionalObservationProviders.js";
import { PRODUCT_IDENTITY } from "../identity.js";
import { silentLogger, type Logger } from "../logger.js";
import { registerApplicationTools } from "./registerApplicationTools.js";
import { registerArtifactTools } from "./registerArtifactTools.js";
import { registerBrowserScenarioTool } from "./registerBrowserScenarioTool.js";
import { registerBrowserTools } from "./registerBrowserTools.js";
import { registerWebScriptTool } from "./registerWebScriptTool.js";
import { registerWebModuleTool } from "./registerWebModuleTool.js";
import type { WebModuleTraceService } from "../application/WebModuleTraceService.js";
import { createWebModuleTraceService } from "../composition/webModules.js";
import { createWebSourceLocationService } from "../composition/webSourceLocations.js";
import { registerWebSourceLocationTool } from "./registerWebSourceLocationTool.js";
import type { WebSourceLocationService } from "../application/WebSourceLocationService.js";
import type { WebRuntimeService } from "../application/WebRuntimeService.js";
import { createWebRuntimeService } from "../composition/webRuntime.js";
import { registerWebRuntimeTools } from "./registerWebRuntimeTools.js";
import type { WebNetworkCaptureService } from "../application/WebNetworkCaptureService.js";
import { createWebNetworkCaptureService } from "../composition/webNetworkCaptures.js";
import { registerWebNetworkCaptureTool } from "./registerWebNetworkCaptureTool.js";
import { registerJavaScriptRecoveryTool } from "./registerJavaScriptRecoveryTool.js";
import { JavaScriptRecoveryService } from "../application/javascript/JavaScriptRecoveryService.js";
import type { JavaScriptRecoveryPort } from "../application/javascript/JavaScriptRecoveryPort.js";
import { createJavaScriptRecoveryProvider } from "../composition/javascriptRecovery.js";
import { registerElectronTools } from "./registerElectronTools.js";
import { registerEnhancedTools } from "./registerEnhancedTools.js";
import { registerJavaScriptRuntimeObservationTools } from "./registerJavaScriptRuntimeObservationTools.js";
import { registerManagedTools } from "./registerManagedTools.js";
import { registerFirmwareTools } from "./registerFirmwareTools.js";
import { FirmwareAnalysisService } from "../application/firmware/FirmwareAnalysisService.js";
import type { FirmwareAnalysisPort } from "../application/firmware/FirmwareAnalysisPort.js";
import { createFirmwareAnalysisProvider } from "../composition/firmware.js";
import { registerAndroidTools } from "./registerAndroidTools.js";
import { AndroidAnalysisService } from "../application/android/AndroidAnalysisService.js";
import type { AndroidAnalysisPort } from "../application/android/AndroidAnalysisPort.js";
import { createAndroidAnalysisProvider } from "../composition/android.js";
import { registerManagedWorkflowTools } from "./registerManagedWorkflowTools.js";
import { registerNativeTools } from "./registerNativeTools.js";
import { registerOfficialTools } from "./registerOfficialTools.js";
import { registerGuidedPrompts } from "./registerPrompts.js";
import { registerSessionTools } from "./registerSessionTools.js";
import type { SessionAvailability } from "./sessionAvailabilityPolicy.js";
import { sessionAvailabilityPolicy } from "./sessionAvailabilityPolicy.js";

const TARGET_FREE_INSTRUCTIONS =
  "REA provides reverse-engineering tools for local artifacts, native binaries, managed code, browser pages, and runtimes. Use the tool that directly answers the question; discover targets or inspect inventory only when needed. Tool results include inline Evidence and report their coverage and limitations.";

const ACTIVE_TARGET_INSTRUCTIONS =
  "REA analyzes the active reverse-engineering target. Use the analysis tool that answers the question directly. Search or list symbols when discovery is needed; analyze_function provides a function dossier, and focused procedure tools return individual facets.";

export interface CreateServerOptions {
  readonly evmInterface?: EvmInterfaceService;
  readonly logger?: Logger;
  readonly binaryLayout?: BinaryLayoutService;
  readonly recordedCrash?: RecordedCrashService;
  readonly firmwareAnalysis?: FirmwareAnalysisPort;
  readonly javascriptRecovery?: JavaScriptRecoveryPort;
  readonly webModuleTrace?: WebModuleTraceService;
  readonly webSourceLocation?: WebSourceLocationService;
  readonly webRuntime?: WebRuntimeService;
  readonly webNetworkCapture?: WebNetworkCaptureService;
  readonly androidAnalysis?: AndroidAnalysisPort;
  readonly browserObservation?: BrowserObservationPort;
  readonly browserScenarioCapture?: BrowserScenarioCapturePort;
  readonly electronObservation?: ElectronObservationPort;
  readonly electronActiveObservation?: ElectronActiveObservationPort;
  readonly javascriptRuntimeObservation?: JavaScriptRuntimeObservationPort;
  readonly availabilityPolicy?: () => SessionAvailability;
  readonly optionalProviderLoadFailures?: OptionalProviderLoadFailures;
}

const installSessionToolAvailability = (
  server: McpServer,
  session: BinarySessionPort | undefined,
  options: CreateServerOptions,
) => {
  if (session === undefined) return undefined;
  const policy = sessionAvailabilityPolicy(options.availabilityPolicy, {
    optionalProviderLoadFailures: options.optionalProviderLoadFailures,
    optionalFeatures: {
      evmInterfaceEnabled:
        options.evmInterface !== undefined ||
        (process.platform === "linux" && process.arch === "x64"),
      webModuleResolutionEnabled:
        options.webModuleTrace !== undefined ||
        isAbsolute(process.env.REA_BROWSER_EXECUTABLE ?? ""),
      recordedCrashEnabled:
        options.recordedCrash !== undefined ||
        (process.platform === "linux" &&
          process.arch === "x64" &&
          isAbsolute(process.env.REA_PWNTOOLS_PYTHON ?? "")),
      binaryLayoutEnabled:
        options.binaryLayout !== undefined ||
        (process.platform === "linux" &&
          process.arch === "x64" &&
          isAbsolute(process.env.REA_PWNTOOLS_PYTHON ?? "")),
      firmwareInspectionEnabled:
        options.firmwareAnalysis !== undefined ||
        (process.platform === "linux" &&
          isAbsolute(process.env.REA_BINWALK_COMMAND ?? "")),
      firmwareExtractionEnabled:
        options.firmwareAnalysis !== undefined ||
        (process.platform === "linux" &&
          isAbsolute(process.env.REA_UNBLOB_COMMAND ?? "")),
      androidAnalysisEnabled:
        options.androidAnalysis !== undefined ||
        ((process.platform === "linux" || process.platform === "darwin") &&
          isAbsolute(process.env.REA_JADX_MCP_JAR ?? "")),
      browserObservationEnabled: options.browserObservation !== undefined,
      javascriptRecoveryEnabled:
        options.javascriptRecovery !== undefined ||
        (process.platform === "linux" &&
          process.arch === "x64" &&
          isAbsolute(process.env.REA_WAKARU_COMMAND ?? "")),
      browserScenarioEnabled: options.browserScenarioCapture !== undefined,
      electronObservationEnabled: options.electronObservation !== undefined,
      electronAutomationEnabled:
        options.electronActiveObservation !== undefined,
      v8InspectorObservationEnabled:
        options.javascriptRuntimeObservation !== undefined,
    },
  });
  return {
    policy,
  };
};

const createMcpServer = (session: BinarySessionPort | undefined): McpServer =>
  new McpServer(
    {
      name: PRODUCT_IDENTITY.mcpServerKey,
      version: PRODUCT_IDENTITY.packageVersion,
    },
    {
      capabilities: {},
      instructions:
        session === undefined
          ? ACTIVE_TARGET_INSTRUCTIONS
          : TARGET_FREE_INSTRUCTIONS,
    },
  );

/**
 * Construct one MCP server without acquiring subprocess resources.
 * Supplying a session adds target lifecycle tools; omitting it retains the
 * fixed-target seam used by focused tests and embedders.
 */
export const createServer = (
  analysis: AnalysisOperationPort,
  session?: BinarySessionPort,
  options: CreateServerOptions = {},
): McpServer => {
  const startedAt = new Date().toISOString();
  const logger = options.logger ?? silentLogger;
  const server = createMcpServer(session);
  const availability = installSessionToolAvailability(server, session, options);
  const toolLogger = logger.child({ layer: "server" });
  const {
    evidenceById,
    activeTarget,
    recordEvidence,
    recordEvidenceWithUnknown,
  } = createSessionRecorders(server, session);
  const toolContext: ServerToolContext = {
    server,
    analysis,
    session,
    options,
    logger: toolLogger,
    evidenceById,
    activeTarget,
    recordEvidence,
    recordEvidenceWithUnknown,
  };
  registerBinaryAnalysisTools(toolContext);
  const android = options.androidAnalysis ?? createAndroidAnalysisProvider();
  const previousOnclose = server.server.onclose;
  server.server.onclose = () => {
    previousOnclose?.();
    void android.close().catch((cause: unknown) => {
      logger.error(
        { error: cause instanceof Error ? cause.message : String(cause) },
        "Android provider cleanup failed",
      );
    });
  };
  const closeServer = server.close.bind(server);
  server.close = async () => {
    const results = await Promise.allSettled([closeServer(), android.close()]);
    for (const result of results)
      if (result.status === "rejected") throw result.reason;
  };
  registerAndroidTools(
    server,
    new AndroidAnalysisService(android),
    toolLogger,
    recordEvidence,
  );
  registerGameProjectTools(
    server,
    createGameProjectInspectionService(),
    toolLogger,
    recordEvidence,
  );
  registerBinaryDiagnosticsTools(
    server,
    options.binaryLayout ?? createBinaryLayoutService(),
    toolLogger,
    recordEvidence,
  );
  registerEvmTools(
    server,
    options.evmInterface ?? createEvmInterfaceService(),
    toolLogger,
    recordEvidence,
  );
  registerRecordedCrashTools(
    server,
    options.recordedCrash ?? createRecordedCrashService(),
    toolLogger,
    recordEvidence,
  );
  registerFirmwareTools(
    server,
    new FirmwareAnalysisService(
      options.firmwareAnalysis ?? createFirmwareAnalysisProvider(),
    ),
    toolLogger,
    recordEvidence,
  );
  registerObservationTools(toolContext);
  registerWebModuleTool(
    server,
    options.webModuleTrace ?? createWebModuleTraceService(),
    toolLogger,
    recordEvidence,
  );
  registerWebSourceLocationTool(
    server,
    options.webSourceLocation ?? createWebSourceLocationService(),
    toolLogger,
    recordEvidence,
  );
  registerWebRuntimeTools(
    server,
    options.webRuntime ?? createWebRuntimeService(),
    toolLogger,
    recordEvidence,
  );
  registerWebNetworkCaptureTool(
    server,
    options.webNetworkCapture ?? createWebNetworkCaptureService(),
    toolLogger,
    recordEvidence,
  );
  registerJavaScriptRecoveryTool(
    server,
    new JavaScriptRecoveryService(
      options.javascriptRecovery ?? createJavaScriptRecoveryProvider(),
    ),
    toolLogger,
    recordEvidence,
  );
  registerGuidedPrompts(server, analysis, session);
  if (session !== undefined) {
    registerSessionTools(server, session, toolLogger, {
      ...options,
      ...(availability === undefined
        ? {}
        : { availabilityPolicy: availability.policy }),
      startedAt,
    });
  }
  return server;
};

const createSessionRecorders = (
  server: McpServer,
  session: BinarySessionPort | undefined,
) => ({
  evidenceById:
    session === undefined
      ? undefined
      : (evidenceId: string) =>
          session.evidenceForAnalysis?.(evidenceId) ??
          session.evidenceById(evidenceId),
  activeTarget:
    session === undefined ? undefined : () => session.activeTarget(),
  recordEvidence:
    session === undefined
      ? undefined
      : (evidence: Parameters<typeof session.recordEvidence>[0]) => {
          const recorded = session.recordEvidence(evidence);
          return recorded;
        },
  recordEvidenceWithUnknown:
    session === undefined
      ? undefined
      : (
          evidence: Parameters<typeof session.recordEvidenceWithUnknown>[0],
          input: Parameters<typeof session.recordEvidenceWithUnknown>[1],
        ) => {
          const recorded = session.recordEvidenceWithUnknown(evidence, input);
          return recorded;
        },
});

interface ServerToolContext extends ReturnType<typeof createSessionRecorders> {
  readonly server: McpServer;
  readonly analysis: AnalysisOperationPort;
  readonly session: BinarySessionPort | undefined;
  readonly options: CreateServerOptions;
  readonly logger: Logger;
}

const registerBinaryAnalysisTools = ({
  server,
  analysis,
  session,
  logger,
  activeTarget,
  recordEvidence,
  recordEvidenceWithUnknown,
}: ServerToolContext): void => {
  const recordUnknown =
    session === undefined
      ? undefined
      : (input: Parameters<typeof session.recordUnknown>[0]) =>
          session.recordUnknown(input);
  const analysisOptions = {
    logger,
    activeTarget,
    recordEvidence,
    recordUnknown,
  };
  registerOfficialTools(server, analysis, analysisOptions);
  registerEnhancedTools(server, analysis, {
    ...analysisOptions,
    analysisProfile:
      session === undefined ? undefined : () => session.analysisProfile(),
    allowsSnapshotReplay:
      session === undefined
        ? undefined
        : (operation) => session.allowsSnapshotReplay(operation),
    recordWorkflowSnapshot:
      session === undefined
        ? undefined
        : (input) => session.recordWorkflowSnapshot(input),
  });
  const evidenceOptions = { logger, activeTarget, recordEvidence };
  registerNativeTools(server, analysis, evidenceOptions);
  registerArtifactTools(server, analysis, {
    ...evidenceOptions,
  });
  registerManagedTools(server, analysis, {
    ...evidenceOptions,
    session,
  });
  if (session !== undefined)
    registerManagedWorkflowTools(server, {
      logger,
      recordEvidence,
      recordEvidenceWithUnknown,
      session,
    });
};

const registerObservationTools = ({
  evidenceById,
  server,
  options,
  logger,
  recordEvidence,
  recordEvidenceWithUnknown,
}: ServerToolContext): void => {
  const common = { logger, recordEvidence };
  registerWebScriptTool(server, common);
  registerBrowserTools(server, {
    ...common,
    browser: options.browserObservation,
    loadFailure: options.optionalProviderLoadFailures?.browserObservation,
  });
  registerBrowserScenarioTool(server, {
    ...common,
    provider: options.browserScenarioCapture,
    loadFailure: options.optionalProviderLoadFailures?.browserScenarioCapture,
  });
  registerElectronTools(server, {
    ...common,
    electron: options.electronObservation,
    electronActive: options.electronActiveObservation,
    observationLoadFailure:
      options.optionalProviderLoadFailures?.electronObservation,
    activeLoadFailure:
      options.optionalProviderLoadFailures?.electronActiveObservation,
  });
  registerJavaScriptRuntimeObservationTools(server, {
    ...common,
    runtime: options.javascriptRuntimeObservation,
    loadFailure:
      options.optionalProviderLoadFailures?.javascriptRuntimeObservation,
  });
  registerApplicationTools(server, {
    evidenceById,
    logger,
    recordEvidence,
    recordEvidenceWithUnknown,
  });
};
