import { GameStatus } from "./game-status.model";
import { GameMode } from "./game-mode.model";

export interface Game {
    gameStatus: GameStatus,
    gameMode:GameMode,
}
