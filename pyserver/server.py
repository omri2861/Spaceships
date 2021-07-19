import os

from flask import Flask, Response
import pymongo
from bson.json_util import dumps

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
        del entry["_id"]
        del entry["__v"]
        yield entry


@app.route("/entities")
def get_entities():
    collection = myclient["Spaceships"]["entities"]
    entities = collection.find()
    return dumps(fix_entries(entities))


@app.route('/', defaults={'path': ''})
@app.route('/<image>')
def get_asset(image):  # pragma: no cover
    complete_path = os.path.join(ASSETS_DIR, image)
    if os.path.isfile(complete_path):
        with open(complete_path, 'rb') as src:
            return src.read()
    else:
        return Response("Not Found", status=404)
