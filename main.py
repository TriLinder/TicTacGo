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

@app.get("/game")
def get_game_page():
    return render_template("game.html")

@app.get("/game_bundle.js")
def get_game_bundle_js():
    return send_file(Path("script/build/bundle.js"))

@app.get("/config")
def get_config():
    return config

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True, ssl_context=ssl_context)