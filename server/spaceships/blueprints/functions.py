from flask import Blueprint, Response

from bson.json_util import dumps
from bson.objectid import ObjectId

from spaceships.context import get_functions
from spaceships.utils import fix_entry

functions = Blueprint("functions", __name__)

@functions.route("/<function_id>", methods=["GET"])
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
