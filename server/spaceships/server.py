import os
import time

# NOTE: Looks like this line sets up the eventlet server. Without this line,
# The flask server doesn't really operate asynchronously and doesn't send
# updates - the value is only updated once the function is done running.
from eventlet import monkey_patch
monkey_patch()

from flask import Flask, Response
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_socketio import SocketIO
from dotenv import load_dotenv

from spaceships.context import init_db
from spaceships.blueprints.elements import elements
from spaceships.blueprints.functions import functions

load_dotenv()

ASSETS_DIR = os.path.join(os.path.abspath(
    os.path.dirname(__file__)), "../assets")


def create_app():
    app = Flask(__name__, )

    with app.app_context():
        init_db()

    return app

app = create_app()

# TODO: Unite /element and /elements routes
app.register_blueprint(elements, url_prefix="/api")
app.register_blueprint(functions, url_prefix="/api/function")


@app.route('/', methods=["GET"])
@app.route('/<image>')
def get_asset(image):  # pragma: no cover
    complete_path = os.path.join(ASSETS_DIR, image)
    if os.path.isfile(complete_path):
        with open(complete_path, 'rb') as src:
            return src.read()
    else:
        return Response("Not Found", status=404)


@app.route("/api/imageNames", methods=["GET"])
def get_image_names():
    """
    Return a list of the possible images for new entities.
    """
    return dumps(os.listdir(ASSETS_DIR))

# Socket IO

# NOTE: Adding localhost as an allowed origin for development
# In production, this should be removed
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

@socketio.on("connect")
def handle_socketio_connect():
    print("Client connected!")

@socketio.on("run")
def run_function(json):
    function_id = json["funcId"]
    entity = json["entity"]
    print(f"Running function {function_id} for {entity}")
    print("Arguments:")
    for arg_name, arg_value in json["args"].items():
        print(f"{arg_name}: {arg_value}")
    
    for i in range(0, 101, 10):
        time.sleep(1)
        print(f"Progress: {i}%")
        socketio.emit("progress", {"value": i})
    
    socketio.emit("done")

@socketio.on("disconnect")
def handle_socketio_disconnect():
    print("Client dissconnected!")

if __name__ == "__main__":
    socketio.run(app, port=8000)
