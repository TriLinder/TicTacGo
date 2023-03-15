import { TicTacGo } from "../main";
import { Hud } from "./hud";

export class UiManager {
    private ticTacGo: TicTacGo;

    public hud: Hud;
    
    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.hud = new Hud(this.ticTacGo);
    }

    public update() {
        this.hud.update();
    }

    public parseGameStatus(gameStatus) {
        this.hud.parseGameStatus(gameStatus);
    }
}