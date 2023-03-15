from flask import Flask, render_template, send_file
from flask_socketio import SocketIO
from pathlib import Path
import json
import ssl

from game_board import GameBoard

ssl_context = ssl.SSLContext()
ssl_context.load_cert_chain("cert.pem", "key.pem")

app = Flask(__name__)
socketio = SocketIO(app)

with open("config.json", "r") as f:
    config = json.load(f)

game_board = GameBoard(config["boardTiles"])

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

@socketio.on("c2s_tile_claim")
def c2s_tile_claim(data):
    x = data["x"]
    y = data["y"]
    letter = data["letter"]
    
    game_board.attempt_to_claim(x, y, letter)
    s2c_board_update()

def s2c_board_update():
    socketio.emit("s2c_board_update", game_board.to_dict(), broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True, ssl_context=ssl_context)