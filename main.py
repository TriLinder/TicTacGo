from flask import Flask, render_template, send_file
from flask_socketio import SocketIO
from pathlib import Path

app = Flask(__name__)
socketio = SocketIO(app)

@app.get("/game")
def get_game_page():
    return render_template("game.html")

@app.get("/game_bundle.js")
def get_game_bundle_js():
    return send_file(Path("script/build/bundle.js"))

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)