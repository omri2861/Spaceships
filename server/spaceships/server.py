import os

from flask import Flask, Response, request, g
from bson.json_util import default, dumps
import json
from bson.objectid import ObjectId

from spaceships.context import init_db, get_entities, get_functions

ASSETS_DIR = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../assets")

def create_app():
    app = Flask(__name__, )

    with app.app_context():
        init_db()

    return app

app = create_app()

# TODO: Create a resource for elements and element
# TODO: Fix terminology again
# TODO: Remove redundant methods

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/hello/<name>")
def hello_to(name):
    return f"<p>Hello, {name}!</p>"


def fix_entry(entry):
    """
    Due to how pymongo works, and to the difference between bson and json format, if you simply dump
    a database entry (e.g. a pymongo.find result), the '_id' field is poorly formatted (It is
    formatted as an object rather than a string). This function fix this format for the _id field,
    and other fields which contains object ids, if needed.
    :param entry: A single database entry (assumed dict or a child of dict).
    :return: The new, properly formatted entry
    """
    entry["id"] = str(entry["_id"])
    if 'source' in entry:
        entry["source"] = str(entry["source"])
    if 'target' in entry:
        entry["target"] = str(entry["target"])
    del entry["_id"]
    if "__v" in entry:
        del entry["__v"]
    return entry


def fix_entries(cursor):
    """
    Runs the fix_entry function on a pymongo cursor (search result). Or to put it simply, runs it
    as a generator.
    """
    for entry in cursor:
        yield fix_entry(entry)


@app.route("/api/elements", methods=["GET"])
def get_elements():
    elements = get_entities().find()
    return dumps(fix_entries(elements))


@app.route('/', methods=["GET"])
@app.route('/<image>')
def get_asset(image):  # pragma: no cover
    complete_path = os.path.join(ASSETS_DIR, image)
    if os.path.isfile(complete_path):
        with open(complete_path, 'rb') as src:
            return src.read()
    else:
        return Response("Not Found", status=404)


@app.route("/api/elements", methods=["POST"])
def add_entity():
    """
    Add a new entity to the database
    """
    new_entity = json.loads(request.data)
    # TODO: Validate schema
    res = get_entities().insert_one(new_entity)
    if not res.acknowledged:
        # TODO: Return error
        pass
    return dumps(get_entities().find_one(res.inserted_id))


@app.route("/api/element/<element_id>", methods=["DELETE"])
def delete_entity(element_id):
    """
    Delete an entity
    """
    res = get_entities().delete_one({"_id": ObjectId(element_id)})
    deleted_count = res.deleted_count

    if deleted_count != 1:
        # TODO: Implement printing the full response in the frontend using axios
        #  instead of printing in backend
        error_message = f"Deleted {deleted_count} entries"
        print(error_message)
        return Response(json.dumps({"message": f"Deleted {deleted_count} entries"}), status=500)
    else:
        return Response("", status=200)


@app.route("/api/element/<element_id>", methods=["PUT"])
def update_element(element_id):
    """
    Update an existing element's data.
    """
    print(f'ELEMENT: {element_id}')
    updated_entity = json.loads(request.data)
    del updated_entity["id"]
    res = get_entities().replace_one({"_id": ObjectId(element_id)}, updated_entity)
    if (not res.acknowledged) or res.modified_count != 1:
        # TODO: Return error
        return ""
    return ""


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
