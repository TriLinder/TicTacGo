import { ConfigManager } from "./config_manager";
import { GameBoard } from "./board/game_board";
import { MapboxManager } from "./mapbox_manager";
import { GeolocationManager } from "./geolocation_manager";
import { UiManager } from "./ui/ui_manager";

export let ticTacGo: TicTacGo;

export class TicTacGo {
    public configManager: ConfigManager;
    public gameBoard: GameBoard;
    public mapboxManager: MapboxManager;
    public geolocationManager: GeolocationManager;
    public uiManager: UiManager;

    constructor(mapboxgl: any) {
        this.initialize(mapboxgl);
    }

    private async initialize(mapboxgl: any) {
        this.configManager = new ConfigManager();
        await this.configManager.load();

        this.mapboxManager = new MapboxManager(this, mapboxgl);
        this.gameBoard = new GameBoard(this, this.configManager.config["boardTiles"]);

        this.geolocationManager = new GeolocationManager(this);
        this.uiManager = new UiManager(this);

        // Update and render the gameboard at 1hz
        setInterval(function() {
            const gameBoardCanvas = (document.getElementById("game_board_canvas") as HTMLCanvasElement);
            this.gameBoard.update();
            this.gameBoard.renderToCanvas(gameBoardCanvas);
        }.bind(this), 1000);

        // Update the UI at 30hz
        setInterval(function() {
            this.uiManager.update();
        }.bind(this), 1000 / 30);
    }
}

// A really hacky way to get mapboxgl. I'm sorry.
// Wait for page load before initializing the main TicTacGo() class.
declare const window: any;

window.addEventListener("load", function() {
    const mapboxgl = (window.mapboxgl as any);

    ticTacGo = new TicTacGo(mapboxgl);
    
    // Hide the loading screen
    document.getElementById("loading_screen").style.display = "none";
});