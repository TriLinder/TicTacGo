import { TicTacGo } from "../../main";
import { Empty, X, O } from "../../board/game_board_tile";

export class HudWinner {
    private ticTacGo: TicTacGo;

    private winnerDiv: HTMLDivElement;
    private winnerText: HTMLElement;

    private resetGameButton: HTMLButtonElement;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.winnerDiv = (document.getElementById("winner_div") as HTMLDivElement);
        this.winnerText = (document.getElementById("winner_text") as HTMLElement);

        this.resetGameButton = (document.getElementById("reset_game_button") as HTMLButtonElement);
        this.resetGameButton.addEventListener("click", this.resetGameButtonClick.bind(this));
    }

    public update() {
        this.winnerDiv.style.display = "none";

        if (!this.ticTacGo.uiManager.playable && !this.ticTacGo.uiManager.pickingGameBoardPosition) {
            this.winnerDiv.style.display = "block";
        }
    }

    public parseGameStatus(gameStatus) {
        if (gameStatus["playable"]) {
            return   
        }

        if (gameStatus["type"] == "tie") {
            this.winnerText.innerHTML = "It's a tie!";
            return;
        }

        const winningLetter = gameStatus["letter"];

        switch (winningLetter) {
            case X:
                this.winnerText.innerHTML = "X won!";
                return;
            case O:
                this.winnerText.innerHTML = "O won!";
                return;
        }
    }

    private resetGameButtonClick() {
        this.ticTacGo.uiManager.setup.currentScreen = "tileSizeConfigure";
    }
}