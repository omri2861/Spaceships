from flask import Blueprint, request, Response

import json
from bson.json_util import dumps
from bson.objectid import ObjectId

from spaceships.context import get_entities
from spaceships.utils import fix_entries

elements = Blueprint("elements", __name__)

@elements.route("/api/elements", methods=["GET"])
def get_elements():
    elements = get_entities().find()
    return dumps(fix_entries(elements))

@elements.route("/api/elements", methods=["POST"])
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


@elements.route("/api/element/<element_id>", methods=["DELETE"])
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


@elements.route("/api/element/<element_id>", methods=["PUT"])
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


