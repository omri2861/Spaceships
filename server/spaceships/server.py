import os

from flask import Flask, Response
from bson.json_util import dumps
from bson.objectid import ObjectId

from spaceships.context import init_db, get_functions
from spaceships.utils import fix_entry
from spaceships.blueprints.elements import elements

ASSETS_DIR = os.path.join(os.path.abspath(
    os.path.dirname(__file__)), "../assets")


def create_app():
    app = Flask(__name__, )

    with app.app_context():
        init_db()

    return app


app = create_app()
app.register_blueprint(elements)


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


@app.route("/api/function/<function_id>", methods=["GET"])
def get_function(function_id):
    """
    Query function data from the database
    """
    # TODO: Maybe perform the join when pulling entity?
    # TODO: Log properly
    # TODO: Maybe change the functions in entities to ObjectIDs, not strings?
    print(f"Looking for function: {function_id}")
    result = get_functions().find_one(ObjectId(function_id))

    if result is None:
        return Response("Not Found", status=404)
    else:
        return dumps(fix_entry(result))
