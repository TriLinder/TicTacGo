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
        this.ctx.clearRect(0, 0, 2048, 2048);
        
        // Render an empty tile
        const emptyTile = new GameBoardTile(this.ticTacGo, -1, -1, Empty);
        const tileImage = emptyTile.render(2048);

        this.ctx.drawImage(tileImage, 256, 256, 2048 - (256 * 2), 2048 - (256 * 2));

        // Diagonal line
        this.ctx.lineWidth = 50;

        this.ctx.moveTo(256, 2048 - 256)
        this.ctx.lineTo(2048 - 256, 256);
        this.ctx.stroke();

        // Render dimensions text
        this.ctx.fillStyle = "black";
        this.ctx.font = `256px sans-serif`;
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";

        // Side text
        this.ctx.fillText(`↔ ${Math.round(this.getSideLenght())}m ↔`, 2048 / 2, 2048 - 128);

        // Diagonal text
        this.ctx.translate(2048 / 2, (2048 / 2) - 256);
        this.ctx.rotate((Math.PI / 180) * -45);

        this.ctx.fillText(`↔ ${Math.round(this.calculateDiagonalLenght())}m ↔`, -128, 0);
        
        this.ctx.restore();
    }
}