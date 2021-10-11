from flask import Response
from bson.objectid import ObjectId

from spaceships import socketio

from spaceships.context import get_entities, get_functions
from spaceships.utils import get_function_from_import_string


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

