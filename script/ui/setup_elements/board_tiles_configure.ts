import { TicTacGo } from "../../main";
import { GameBoard } from "../../board/game_board";

export class SetupBoardTilesConfigure {
    private ticTacGo: TicTacGo;

    private boardTilesConfigureDiv: HTMLDivElement;
    private boardTilesInput: HTMLInputElement;

    private continueButton: HTMLButtonElement;

    private canvas: HTMLCanvasElement;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.boardTilesConfigureDiv = (document.getElementById("board_tiles_configure_div") as HTMLDivElement);

        this.boardTilesInput = (document.getElementById("board_tiles_configure_input") as HTMLInputElement);
        this.continueButton = (document.getElementById("board_size_configure_continue_button") as HTMLButtonElement);

        this.boardTilesInput.addEventListener("change", this.renderCanvas.bind(this));
        this.continueButton.addEventListener("click", function() {this.ticTacGo.uiManager.setup.currentScreen = "tilesRequiredToWinConfigure";}.bind(this));

        this.canvas = (document.getElementById("board_tiles_configure_canvas") as HTMLCanvasElement);
    }

    public update() {
        if (this.ticTacGo.uiManager.setup.currentScreen == "boardTilesConfigure") {
            // On first frame of this screen
            if (this.boardTilesConfigureDiv.style.display == "none") {
                this.boardTilesInput.value = "3";
                this.renderCanvas();
                
                this.boardTilesConfigureDiv.style.display = "block";
            }
        }
        else {
            this.boardTilesConfigureDiv.style.display = "none";
            return;
        }

        if (!this.getTileAmount()) {
            this.boardTilesInput.value = "3";
            this.renderCanvas();
        }
    }

    private getTileAmount() {
        const tileAmount = Number(this.boardTilesInput.value);

        if (tileAmount < 2 || tileAmount > 20) {
            return null;
        }

        return tileAmount;
    }

    public renderCanvas() {
        // Render the board
        const board = new GameBoard(this.ticTacGo, this.getTileAmount());
        board.renderToCanvas(this.canvas);
    }
}