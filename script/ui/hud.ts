import { TicTacGo } from "../main";
import { HudTileClaiming } from "./hud_elements/hud_tile_claiming";
import { HudWinner } from "./hud_elements/hud_winner";

export class Hud {
    private ticTacGo: TicTacGo;

    public tileClaiming: HudTileClaiming;
    public winner: HudWinner;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.tileClaiming = new HudTileClaiming(this.ticTacGo);
        this.winner = new HudWinner(this.ticTacGo);
    }

    public update() {
        this.tileClaiming.update();
        this.winner.update();
    }

    public parseGameStatus(gameStatus) {
        this.winner.parseGameStatus(gameStatus);
    }
}