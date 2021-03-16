from flask import Flask
from flask_cors import CORS
from pymongo_inmemory import MongoClient
import json
from bson import json_util, ObjectId
from flask import jsonify
from flask import request

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

alert = open("alerts.json", "r").read()
contact = open("contacts.json", "r").read()

client = MongoClient()  # No need to provide host
db = client['rocketdb']
alertsCollection = db['alerts']
contactsCollection = db['contacts']
accountsCollection = db['accounts']

alertsCollection.delete_many({})
alertsCollection.insert_many(json.loads(alert))

contactsCollection.delete_many({})
contactsCollection.insert_many(json.loads(contact))

accountsCollection.delete_many({})


@app.route('/', methods=['GET'])
def home():
    return "<h1>Rocket Communications Full Stack Developer Coding Challenge</h1>"


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
