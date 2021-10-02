import os
import pymongo
from flask import g, current_app

DB_NAME = os.environ.get("SPACESHIPS_DB", "Spaceships")

def init_db():
    @current_app.teardown_appcontext
    def teardown_db(exception):
        db = g.pop('db', None)

        if db is not None:
            db.close()

def get_entities():
    # TODO: Maybe embed these in 'g' in the 'before_request' hook? Instead of using these functions
    if 'db' not in g:
        g.db = pymongo.MongoClient("mongodb://localhost:27017/")

    return g.db[DB_NAME]["entities"]


def get_functions():
    if 'db' not in g:
        g.db = pymongo.MongoClient("mongodb://localhost:27017/")

    return g.db[DB_NAME]["functions"]