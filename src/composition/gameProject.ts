import { GameProjectInspectionService } from "../application/game/GameProjectInspectionService.js";
import { UnityProjectInspector } from "../inspector/game/UnityProjectInspector.js";

/** Compose the supported static game-project profile without editor dependencies. */
export const createGameProjectInspectionService =
  (): GameProjectInspectionService =>
    new GameProjectInspectionService(new UnityProjectInspector());
