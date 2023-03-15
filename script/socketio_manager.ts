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
    }

    private onConnect() {
        alert("Connected!")
    }
}