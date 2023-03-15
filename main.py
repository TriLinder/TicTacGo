from flask import Flask, render_template, send_file
from flask_socketio import SocketIO
from pathlib import Path
import json
import ssl

ssl_context = ssl.SSLContext()
ssl_context.load_cert_chain("cert.pem", "key.pem")

app = Flask(__name__)
socketio = SocketIO(app)

with open("config.json", "r") as f:
    config = json.load(f)

Empty = 0
X = 1
O = 2

class GameBoard:
    def __init__(self) -> None:
        self.board = []
        self.size = config["boardTiles"]

        self.reset()

    def reset(self) -> None:
        self.board = []

        for x in range(self.size):
            self.board.append([])
            for y in range(self.size):
                self.board[x].append(Empty)

game_board = GameBoard()

@app.get("/game")
def get_game_page():
    return render_template("game.html")

@app.get("/game_bundle.js")
def get_game_bundle_js():
    return send_file(Path("script/build/bundle.js"))

@app.get("/config")
def get_config():
    return config

@socketio.on("c2s_data_request")
def c2s_data_request():
    s2c_board_update()

def s2c_board_update():
    socketio.emit("s2c_board_update", game_board.board, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True, ssl_context=ssl_context)