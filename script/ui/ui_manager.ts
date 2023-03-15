import { TicTacGo } from "../main";
import { Hud } from "./hud";
import { Setup } from "./setup";

export class UiManager {
    private ticTacGo: TicTacGo;

    public hud: Hud;
    public setup: Setup;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.hud = new Hud(this.ticTacGo);
        this.setup = new Setup(this.ticTacGo);
    }

    public update() {
        this.hud.update();
        this.setup.update();
    }

    public parseGameStatus(gameStatus) {
        this.hud.parseGameStatus(gameStatus);
    }
}