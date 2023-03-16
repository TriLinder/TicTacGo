import { TicTacGo } from "../../main";

export class HudSetGameBoardPosition {
    private ticTacGo: TicTacGo;
    
    private setGameBoardPositionDiv: HTMLDivElement;

    private setPositionButton: HTMLButtonElement;
    private teleportMarkerButton: HTMLButtonElement;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.setGameBoardPositionDiv = (document.getElementById("set_game_board_position") as HTMLDivElement);

        this.setPositionButton = (document.getElementById("set_game_board_position_button") as HTMLButtonElement);
        this.teleportMarkerButton = (document.getElementById("teleport_marker_button") as HTMLButtonElement);

        this.setPositionButton.addEventListener("click", this.setPositionClick.bind(this));
        this.teleportMarkerButton.addEventListener("click", this.teleportMarkerButtonClick.bind(this));
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

    public teleportMarkerButtonClick() {
        this.ticTacGo.mapboxManager.draggableMarker.setLngLat(this.ticTacGo.mapboxManager.map.getCenter());
    }
}