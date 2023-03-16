import { TicTacGo } from "../../main";

export class SetupTilesRequiredToWinCongiure {
    private ticTacGo :TicTacGo;

    private tilesRequiredToWinConfigureDiv: HTMLDivElement;
    private tilesRequiredToWinInput: HTMLInputElement;

    private tilesRequiredToWinConfigureTileCountText: HTMLParagraphElement;
    
    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.tilesRequiredToWinConfigureDiv = (document.getElementById("tiles_required_to_win_configure_div") as HTMLDivElement);
    
        this.tilesRequiredToWinInput = (document.getElementById("tiles_required_to_win_configure_input") as HTMLInputElement);
        
        this.tilesRequiredToWinInput.addEventListener("change", this.onInputChange.bind(this));

        this.tilesRequiredToWinConfigureTileCountText = (document.getElementById("tiles_required_to_win_configure_tile_count_text") as HTMLParagraphElement);
    }

    public update() {
        if (this.ticTacGo.uiManager.setup.currentScreen == "tilesRequiredToWinConfigure") {
            // On first frame of this screen
            if (this.tilesRequiredToWinConfigureDiv.style.display == "none") {
                this.tilesRequiredToWinInput.max = this.ticTacGo.uiManager.setup.boardTilesConfigure.getTileAmount().toString();
                this.onInputChange();

                this.tilesRequiredToWinConfigureDiv.style.display = "block";
            }
        }
        else {
            this.tilesRequiredToWinConfigureDiv.style.display = "none";
            return;
        }
    }

    public getTileCount() {
        return Number(this.tilesRequiredToWinInput.value);
    }

    private onInputChange() {
        this.tilesRequiredToWinConfigureTileCountText.textContent = `${this.getTileCount()} tile(s)`;       
    }
}