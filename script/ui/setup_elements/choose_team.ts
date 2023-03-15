import { TicTacGo } from "../../main";
import { X, O } from "../../board/game_board_tile";

export class SetupChooseTeam {
    private ticTacGo: TicTacGo;

    private chooseTeamDiv: HTMLDivElement;

    private playAsXButton: HTMLButtonElement;
    private playAsOButton: HTMLButtonElement;

    private configureLink: HTMLLinkElement;
    
    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.chooseTeamDiv = (document.getElementById("choose_team_div") as HTMLDivElement);
        
        this.playAsXButton = (document.getElementById("play_as_x_button") as HTMLButtonElement);
        this.playAsOButton = (document.getElementById("play_as_o_button") as HTMLButtonElement);

        this.configureLink = (document.getElementById("configure_link") as HTMLLinkElement);

        this.playAsXButton.addEventListener("click", function() {this.playAsButtonClick(X)}.bind(this));
        this.playAsOButton.addEventListener("click", function() {this.playAsButtonClick(O)}.bind(this));

        this.configureLink.addEventListener("click", function() {this.ticTacGo.uiManager.setup.currentScreen = "tileSizeConfigure";}.bind(this));
    }

    public update() {
        if (this.ticTacGo.uiManager.setup.currentScreen == "chooseTeam") {
            this.chooseTeamDiv.style.display = "block";
        }
        else {
            this.chooseTeamDiv.style.display = "none";
            return;
        }
    }

    public playAsButtonClick(letter) {
        this.ticTacGo.gameBoard.playingAs = letter;

        this.ticTacGo.uiManager.setup.currentScreen = null;
    }
}