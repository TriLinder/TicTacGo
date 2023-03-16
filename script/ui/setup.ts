import { TicTacGo } from "../main";
import { SetupBoardTilesConfigure } from "./setup_elements/board_tiles_configure";
import { SetupChooseTeam } from "./setup_elements/choose_team";
import { SetupTileSizeConfigure } from "./setup_elements/tile_size_configure";
import { SetupTilesRequiredToWinCongiure } from "./setup_elements/tiles_required_to_win_configure";

export class Setup {
    private ticTacGo: TicTacGo;
    
    public currentScreen: string | null;

    public chooseTeam: SetupChooseTeam
    public tileSizeConfigure: SetupTileSizeConfigure;
    public boardTilesConfigure: SetupBoardTilesConfigure;
    public tilesRequiredToWinConfgiure: SetupTilesRequiredToWinCongiure;

    private setupDiv: HTMLDivElement;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        this.currentScreen = "chooseTeam";

        this.chooseTeam = new SetupChooseTeam(this.ticTacGo);
        this.tileSizeConfigure = new SetupTileSizeConfigure(this.ticTacGo);
        this.boardTilesConfigure = new SetupBoardTilesConfigure(this.ticTacGo);
        this.tilesRequiredToWinConfgiure = new SetupTilesRequiredToWinCongiure(this.ticTacGo);

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
        this.tileSizeConfigure.update();
        this.boardTilesConfigure.update();
        this.tilesRequiredToWinConfgiure.update();
    }
}