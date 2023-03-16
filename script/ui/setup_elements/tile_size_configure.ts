import { TicTacGo } from "../../main";
import { Empty, GameBoardTile } from "../../board/game_board_tile";

export class SetupTileSizeConfigure {
    private ticTacGo: TicTacGo;

    private tileSizeConfigureDiv: HTMLDivElement;
    private tileSizeInput: HTMLInputElement;

    private continueButton: HTMLButtonElement;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.tileSizeConfigureDiv = (document.getElementById("tile_size_configure_div") as HTMLDivElement);
        this.tileSizeInput = (document.getElementById("tile_size_input") as HTMLInputElement);

        this.continueButton = (document.getElementById("tile_size_configure_continue_button") as HTMLButtonElement);

        this.continueButton.addEventListener("click", function() {this.ticTacGo.uiManager.setup.currentScreen = "boardTilesConfigure";}.bind(this));

        this.canvas = (document.getElementById("tile_size_canvas") as HTMLCanvasElement);
        this.ctx = this.canvas.getContext("2d")!;
    }

    public update() {
        if (this.ticTacGo.uiManager.setup.currentScreen == "tileSizeConfigure") {
            this.tileSizeConfigureDiv.style.display = "block";
        }
        else {
            this.tileSizeConfigureDiv.style.display = "none";
            return;
        }

        if (!this.getSideLenght()) {
            this.tileSizeInput.value = "0";
        }

        this.renderCanvas();
    }

    private getSideLenght() {
        const sideLenght = Number(this.tileSizeInput.value);

        if (sideLenght < 0 || sideLenght > 99999) {
            return null;
        }

        return sideLenght;
    }

    private calculateDiagonalLenght() {
        const sideLenght = this.getSideLenght();

        return Math.sqrt(Math.pow(sideLenght, 2) * 2);
    }

    public renderCanvas() {
        // Clear the canvas
        this.ctx.save();
        this.ctx.clearRect(0, 0, 512, 512);
        
        // Render an empty tile
        const emptyTile = new GameBoardTile(this.ticTacGo, -1, -1, Empty);
        const tileImage = emptyTile.render(512);

        this.ctx.drawImage(tileImage, 64, 64, 512 - (64 * 2), 512 - (64 * 2));

        // Diagonal line
        this.ctx.lineWidth = 12;

        this.ctx.moveTo(64, 512 - 64)
        this.ctx.lineTo(512 - 64, 64);
        this.ctx.stroke();

        // Render dimensions text
        this.ctx.fillStyle = "black";
        this.ctx.font = `64px sans-serif`;
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";

        // Side text
        this.ctx.fillText(`↔ ${Math.round(this.getSideLenght())}m ↔`, 512 / 2, 512 - 32);

        // Diagonal text
        this.ctx.translate(512 / 2, (512 / 2) - 64);
        this.ctx.rotate((Math.PI / 180) * -45);

        this.ctx.fillText(`↔ ${Math.round(this.calculateDiagonalLenght())}m ↔`, -32, 0);
        
        this.ctx.restore();
    }
}