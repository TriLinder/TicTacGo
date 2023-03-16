import { TicTacGo } from "../main";
import { HudTileClaiming } from "./hud_elements/hud_tile_claiming";
import { HudWinner } from "./hud_elements/hud_winner";
import { HudSetGameBoardPosition } from "./hud_elements/hud_set_game_board_position";

export class Hud {
    private ticTacGo: TicTacGo;

    public tileClaiming: HudTileClaiming;
    public winner: HudWinner;
    public setGameBoardPositon: HudSetGameBoardPosition

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.tileClaiming = new HudTileClaiming(this.ticTacGo);
        this.winner = new HudWinner(this.ticTacGo);
        this.setGameBoardPositon = new HudSetGameBoardPosition(this.ticTacGo);
    }

    public update() {
        this.tileClaiming.update();
        this.winner.update();
        this.setGameBoardPositon.update();
    }

    public parseGameStatus(gameStatus) {
        this.winner.parseGameStatus(gameStatus);
    }
}