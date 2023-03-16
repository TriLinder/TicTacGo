import { TicTacGo } from "./main";
import { GameBoardTile } from "./board/game_board_tile";

export class SocketioManager {
    private ticTacGo: TicTacGo;

    public socketio: any;

    constructor(ticTacGo: TicTacGo, socketio: any) {
        this.ticTacGo = ticTacGo;
        this.socketio = socketio;

        this.initialize();
    }

    private initialize() {
        this.socketio.on("connect", this.onConnect.bind(this));

        this.socketio.on("s2c_board_update", this.s2cBoardUpdate.bind(this));
        this.socketio.on("s2c_game_state_update", this.s2cGameStateUpdate.bind(this));
    }

    private onConnect() {
        console.log("SocketIO connected!");
        this.c2sDataRequest();
    }

    public c2sDataRequest() {
        this.socketio.emit("c2s_data_request");
    }

    public c2sTileClaim(tile: GameBoardTile) {
        this.socketio.emit("c2s_tile_claim", {x: tile.x, y: tile.y, letter: this.ticTacGo.gameBoard.playingAs});
    }

    public c2sConfigUpdate(newConfig) {
        this.socketio.emit("c2s_config_update", newConfig);
    }

    public s2cGameStateUpdate(data) {
        this.ticTacGo.uiManager.playable = data["playable"];
        this.ticTacGo.uiManager.parseGameStatus(data);
    }

    public s2cBoardUpdate(data) {
        this.ticTacGo.gameBoard.parseBoardUpdateSocket(data);
    }
}