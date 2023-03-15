import { TicTacGo } from "../main";
import { HudTileClaiming } from "./hud_elements/hud_tile_claiming";

export class Hud {
    private ticTacGo: TicTacGo;

    public tileClaiming: HudTileClaiming;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.tileClaiming = new HudTileClaiming(this.ticTacGo);
    }

    public update() {
        this.tileClaiming.update();
    }
}