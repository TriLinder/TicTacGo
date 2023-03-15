import { TicTacGo } from "../../main";
import { Empty } from "../../board/game_board_tile";

export class HudTileClaiming {
    private ticTacGo: TicTacGo;

    private outsideGameboardDiv: HTMLDivElement;
    private tileAlreadyClaimedDiv: HTMLDivElement;
    private tileClaimable: HTMLDivElement;
    
    private tileClaimButton: HTMLButtonElement;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.outsideGameboardDiv = (document.getElementById("outside_gameboard") as HTMLDivElement);
        this.tileAlreadyClaimedDiv = (document.getElementById("tile_already_claimed") as HTMLDivElement);
        this.tileClaimable = (document.getElementById("tile_claimable") as HTMLDivElement);

        this.tileClaimButton = (document.getElementById("tile_claim_button") as HTMLButtonElement);
        this.tileClaimButton.addEventListener("click", this.tileClaimButtonClick.bind(this));
    }

    public update() {
        this.outsideGameboardDiv.style.display = "none";
        this.tileAlreadyClaimedDiv.style.display = "none";
        this.tileClaimable.style.display = "none";

        const selectedTile = this.ticTacGo.gameBoard.selectedTile;

        if (!selectedTile) {
            this.outsideGameboardDiv.style.display = "block";
            return;
        }

        if (selectedTile.state == Empty) {
            this.tileClaimable.style.display = "block";
            return;
        }
        else {
            this.tileAlreadyClaimedDiv.style.display = "block";
            return;
        }
    }

    private tileClaimButtonClick() {
        alert("Tile claimed");
    }
}