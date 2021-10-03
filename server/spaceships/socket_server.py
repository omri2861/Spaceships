import time

from flask_socketio import SocketIO
from flask import Flask
import eventlet

# NOTE: Looks like this line sets up the eventlet server. Without this line,
# The flask server doesn't really operate asynchronously and doesn't send
# updates - the value is only updated once the function is done running.
eventlet.monkey_patch()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

@socketio.on("connect")
def handle_socketio_connect():
    print("Client connected!")

@socketio.on("run")
def run_function(json):
    function_id = json["funcId"]
    entity = json["entity"]
    print(f"Running function {function_id} for {entity}")
    
    for i in range(0, 101, 10):
        time.sleep(1)
        print(f"Progress: {i}%")
        socketio.emit("progress", f"{i}%")
    
    socketio.emit("done")

@socketio.on("disconnect")
def handle_socketio_disconnect():
    print("Client dissconnected!")

socketio.run(app)