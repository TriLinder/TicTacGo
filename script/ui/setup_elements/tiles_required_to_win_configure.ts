import { TicTacGo } from "../../main";

export class SetupTilesRequiredToWinCongiure {
    private ticTacGo :TicTacGo;

    private screenDiv: HTMLDivElement;
    private rangeInput: HTMLInputElement;

    private countText: HTMLParagraphElement;

    private continueButton: HTMLButtonElement;
    
    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.screenDiv = (document.getElementById("tiles_required_to_win_configure_div") as HTMLDivElement);
    
        this.rangeInput = (document.getElementById("tiles_required_to_win_configure_input") as HTMLInputElement);
        this.rangeInput.addEventListener("change", this.onInputChange.bind(this));

        this.countText = (document.getElementById("tiles_required_to_win_configure_tile_count_text") as HTMLParagraphElement);

        this.continueButton = (document.getElementById("tiles_required_to_win_configure_continue_button") as HTMLButtonElement);
        this.continueButton.addEventListener("click", this.continueButtonClick.bind(this));
    }

    public update() {
        if (this.ticTacGo.uiManager.setup.currentScreen == "tilesRequiredToWinConfigure") {
            // On first frame of this screen
            if (this.screenDiv.style.display == "none") {
                this.rangeInput.max = this.ticTacGo.uiManager.setup.boardTilesConfigure.getTileAmount().toString();
                this.onInputChange();

                this.screenDiv.style.display = "block";
            }
        }
        else {
            this.screenDiv.style.display = "none";
            return;
        }
    }

    public getTileCount() {
        return Number(this.rangeInput.value);
    }

    private onInputChange() {
        this.countText.textContent = `${this.getTileCount()} tile(s)`;       
    }

    private continueButtonClick() {
        this.ticTacGo.uiManager.pickingGameBoardPosition = true;
        this.ticTacGo.mapboxManager.addDraggableMarker();

        this.ticTacGo.uiManager.setup.currentScreen = null;
    }
}