from flask import Flask
from flask_cors import CORS
import pymongo
import json
from bson import json_util, ObjectId
from flask import jsonify
from flask import request

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient(
    "mongodb+srv://alex:Slnx=xlnx-x@cluster0.qjtr4.mongodb.net/rocket?retryWrites=true&w=majority")
db = client["rocket"]
alertsCollection = db['alerts']
contactsCollection = db['contacts']
accountsCollection = db['accounts']


@app.route('/', methods=['GET'])
def home():
    return "<h1>Rocket Communications Full Stack Developer Coding Challenge</h1>"


# Only used once to initialize data
# @app.route('/load', methods=['GET'])
# def home():
#     alert = open("alerts.json", "r").read()
#     data = json.loads(alert)
#     alertsCollection.delete_many({})
#     alertsCollection.insert_many(data)
#
#     contact = open("contacts.json", "r").read()
#     data = json.loads(contact)
#     contactsCollection.delete_many({})
#     contactsCollection.insert_many(data)
#     return "data loaded"


@app.route('/alerts', methods=['GET'])
def alerts():
    mylist = list(alertsCollection.find())
    return jsonify(json.loads(json_util.dumps(mylist)))


@app.route('/contacts', methods=['GET'])
def contacts():
    mylist = list(contactsCollection.find())
    return jsonify(json.loads(json_util.dumps(mylist)))


@app.route('/login', methods=['POST'])
def verify_account():
    data = request.json
    username = data['username']
    password = data['password']
    found = list(accountsCollection.find({
        "username": username,
        "password": password
    }))
    return str(len(found) == 1)


@app.route('/account', methods=['POST'])
def register_account():
    data = request.json
    username = data['username']
    password = data['password']
    found = list(accountsCollection.find({
        'username': username
    }))

    exists = 0
    if len(found) > 0:
        exists = 1
    else:
        accountsCollection.insert_one({
            'username': username,
            'password': password
        })
    return {
        'exists': exists
    }


app.run()
