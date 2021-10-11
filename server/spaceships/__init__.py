# NOTE: Looks like this line sets up the eventlet server. Without this line,
# The flask server doesn't really operate asynchronously and doesn't send
# updates - the value is only updated once the function is done running.
from eventlet import monkey_patch
monkey_patch()

from flask import Flask
from flask_socketio import SocketIO

from spaceships.context import init_db

# NOTE: Adding localhost as an allowed origin for development
# In production, this should be removed
socketio = SocketIO(cors_allowed_origins="http://localhost:3000")

def create_app():
    app = Flask(__name__, )

    with app.app_context():
        init_db()

    socketio.init_app(app)

    return app
