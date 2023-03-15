import { TicTacGo } from "./main";

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
    }

    private onConnect() {
        console.log("SocketIO connected!");
        this.c2sDataRequest();
    }

    public c2sDataRequest() {
        this.socketio.emit("c2s_data_request");
    }

    public s2cBoardUpdate(data) {
        this.ticTacGo.gameBoard.parseBoardUpdateSocket(data);
    }
}