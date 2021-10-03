import os
import time

from flask import Flask, Response
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_socketio import SocketIO

from spaceships.context import init_db
from spaceships.blueprints.elements import elements
from spaceships.blueprints.functions import functions

ASSETS_DIR = os.path.join(os.path.abspath(
    os.path.dirname(__file__)), "../assets")


def create_app():
    app = Flask(__name__, )

    with app.app_context():
        init_db()

    return app

app = create_app()
socketio = SocketIO(app)

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
