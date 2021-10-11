from typing import Optional
from flask import Response
from bson.objectid import ObjectId
from flask_socketio import SocketIO

from spaceships import socketio

from spaceships.context import get_entities, get_functions
from spaceships.utils import get_function_from_import_string


class ProgressBar:
    def __init__(self, client: SocketIO):
        self.client = client
        self.total = None
        self.progress = 0

    def set_total(self, total: int):
        if self.total is not None:
            raise RuntimeError("Total for progress bar is already set")

        if total < 0:
            raise ValueError("Total progress bar value must be positive")

        self.total = total

    def update(self, progress: int):
        """
        Updates the progress made. Note that the progress is _added_ to the
        current progress, not set. This means there's no option to take
        the progress bar back.
        """
        if self.total is None:
            raise RuntimeError("Total not yet set")

        self.progress += progress
        self.client.emit("progress", {"value": round((self.progress / self.total) * 100)})


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

    progress_bar = ProgressBar(socketio)
    updated_entity = function(entity, progress_bar, **json["args"])

    if updated_entity["_id"] != entity_id:
        print("Error! entity id changed...")
        return Response(status=500)

    get_entities().find_one_and_replace({"_id": entity_id}, updated_entity)

    socketio.emit("done")


@socketio.on("disconnect")
def handle_socketio_disconnect():
    print("Client dissconnected!")
