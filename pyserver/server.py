
from flask import Flask
import pymongo
from bson.json_util import dumps

app = Flask(__name__)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

print(myclient["Spaceships"])

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/hello/<name>")
def hello_to(name):
    return f"<p>Hello, {name}!</p>"

@app.route("/entities")
def get_entities():
    collection = myclient["Spaceships"]["entities"]
    # TODO: Fix the _id field (so it won't send the BSON type)
    return dumps(collection.find())
