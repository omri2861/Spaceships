import os
import time

from spaceships import create_app, socketio

from flask import Response
from bson.json_util import dumps
from bson.objectid import ObjectId
from dotenv import load_dotenv

from spaceships.blueprints.elements import elements
from spaceships.blueprints.functions import functions

load_dotenv()

ASSETS_DIR = os.path.join(os.path.abspath(
    os.path.dirname(__file__)), "../assets")

app = create_app()

# TODO: Unite /element and /elements routes
app.register_blueprint(elements, url_prefix="/api")
app.register_blueprint(functions, url_prefix="/api/function")

# NOTE: Only make the run file execute, don't really need to import anything
import spaceships.blueprints.run


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


if __name__ == "__main__":
    socketio.run(app, port=8000)
