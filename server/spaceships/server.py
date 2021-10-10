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
from spaceships.blueprints.functions import functions, get_function

from spaceships.context import get_entities, get_functions
from spaceships.utils import get_function_from_import_string

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
    function_id = ObjectId(json["funcId"])
    entity_id = ObjectId(json["entityId"])
    entity = get_entities().find_one({"_id": entity_id})
    function_definition = get_functions().find_one({"_id": function_id})

    if entity is None or function_definition is None:
        return Response(status=404)

    function = get_function_from_import_string(function_definition["importString"])

    print("##### Entity #####")
    print(entity)
    print("##### Function #####")
    print(function_definition)

    # TODO: Supply interface for updating progress
    updated_entity = function(entity, **json["args"])
    
    if updated_entity["_id"] != entity_id:
        print("Error! entity id changed...")
        return Response(status=500)
    
    get_entities().find_one_and_replace({"_id": entity_id}, updated_entity)
    
    socketio.emit("done")

@socketio.on("disconnect")
def handle_socketio_disconnect():
    print("Client dissconnected!")

if __name__ == "__main__":
    socketio.run(app, port=8000)
