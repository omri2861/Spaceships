import os

from flask import Flask, Response
import pymongo
from bson.json_util import dumps
import json
from bson.objectid import ObjectId

ASSETS_DIR = os.path.join(os.path.abspath(os.path.dirname(__file__)), "assets")

app = Flask(__name__, )

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

print(myclient["Spaceships"])


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/hello/<name>")
def hello_to(name):
    return f"<p>Hello, {name}!</p>"


def fix_entries(cursor):
    """
    This function changes the database entries, so they can be sent to the client
    properly formatted. It fixes the id property's type (from bson dict to string)
    and removes redundant '__v' property.
    :param cursor: An iterable of db entries that should be fixed
    :return: A generator of the fixed entries
    """
    for entry in cursor:
        entry["id"] = str(entry["_id"])
        if 'source' in entry:
            entry["source"] = str(entry["source"])
        if 'target' in entry:
            entry["target"] = str(entry["target"])
        del entry["_id"]
        del entry["__v"]
        yield entry


@app.route("/entities", methods=["GET"])
def get_entities():
    collection = myclient["Spaceships"]["entities"]
    entities = collection.find()
    return dumps(fix_entries(entities))


@app.route('/', methods=["GET"])
@app.route('/<image>')
def get_asset(image):  # pragma: no cover
    complete_path = os.path.join(ASSETS_DIR, image)
    if os.path.isfile(complete_path):
        with open(complete_path, 'rb') as src:
            return src.read()
    else:
        return Response("Not Found", status=404)


@app.route("/api/addEntity", methods=["POST"])
def add_entity():
    """
    Add a new entity to the database
    """
    pass


@app.route("/api/deleteEntity/<element_id>", methods=["DELETE"])
def delete_entity(element_id):
    """
    Delete an entity
    """
    collection = myclient["Spaceships"]["entities"]
    res = collection.delete_one({"_id": ObjectId(element_id)})
    deleted_count = res.deleted_count

    if deleted_count != 1:
        # TODO: Implement printing the full response in the frontend using axios
        #  instead of printing in backend
        error_message = f"Deleted {deleted_count} entries"
        print(error_message)
        return Response(json.dumps({"message": f"Deleted {deleted_count} entries"}), status=500)
    else:
        return Response("", status=200)


app.route("/api/element/<element_id>", methods=["PUT"])
def update_element(element_id):
    """
    Update an existing element's data.
    """
    pass


@app.route("/api/imageNames", methods=["GET"])
def get_image_names():
    """
    Return a list of the possible images for new entities.
    """
    return dumps(os.listdir(ASSETS_DIR))
