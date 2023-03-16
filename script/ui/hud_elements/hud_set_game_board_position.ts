import { TicTacGo } from "../../main";

export class HudSetGameBoardPosition {
    private ticTacGo: TicTacGo;
    
    private setGameBoardPositionDiv: HTMLDivElement;

    private setPositionButton: HTMLButtonElement;
    private flyToMarkerButton: HTMLButtonElement;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.setGameBoardPositionDiv = (document.getElementById("set_game_board_position") as HTMLDivElement);

        this.setPositionButton = (document.getElementById("set_game_board_position_button") as HTMLButtonElement);
        this.flyToMarkerButton = (document.getElementById("fly_to_marker_button") as HTMLButtonElement);

        this.setPositionButton.addEventListener("click", this.setPositionClick.bind(this));
        this.flyToMarkerButton.addEventListener("click", this.flyToMarkerButtonClick.bind(this));
    }

    public update() {
        this.setGameBoardPositionDiv.style.display = "none";

        if (this.ticTacGo.uiManager.pickingGameBoardPosition) {
            this.setGameBoardPositionDiv.style.display = "block";
        }
    }

    public setPositionClick() {
        this.setPositionButton.disabled = true;
        this.ticTacGo.uiManager.setup.sendNewConfiguration();
    }

    public flyToMarkerButtonClick() {
        this.ticTacGo.mapboxManager.map.flyTo({center: this.ticTacGo.mapboxManager.draggableMarker.getLngLat()});
    }
}