import { TicTacGo } from "../main";
import { SetupChooseTeam } from "./setup_elements/choose_team";

export class Setup {
    private ticTacGo: TicTacGo;
    
    public currentScreen: string | null;

    public chooseTeam: SetupChooseTeam

    private setupDiv: HTMLDivElement;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.currentScreen = "chooseTeam";

        this.chooseTeam = new SetupChooseTeam(this.ticTacGo);

        this.setupDiv = (document.getElementById("setup_div") as HTMLDivElement);
    }

    public update() {
        if (this.currentScreen) {
            this.setupDiv.style.display = "block";
        }
        else {
            this.setupDiv.style.display = "none";
            return;
        }

        this.chooseTeam.update();
    }
}