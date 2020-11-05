from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import json

from models import db, ContactsModel, AlertsModel
from endpoints import Signup, Login

 # ContactsModel, AlertsModel, UserModel

app = Flask(__name__, instance_relative_config=True)
api = Api(app)
jwt = JWTManager(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/assets.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Normally an environment variable outside the repo
app.config["JWT_SECRET_KEY"] = "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 60000


db.init_app(app)


# ---!!! Create Database !!!---
# NOTE: Will create and seed database if not found on first API request
@app.before_first_request
def create_tables():
    db.create_all()
    contacts = json.load(open("../contacts.json"))
    alerts = json.load(open("../alerts.json"))
    for i in contacts:
        contact = ContactsModel(
        _id=i["_id"],
        contactId=i["contactId"],
        contactStatus=i["contactStatus"],
        contactName=i["contactName"],
        contactGround=i["contactGround"],
        contactSatellite=i["contactSatellite"],
        contactEquipment=i["contactEquipment"],
        contactState=i["contactState"],
        contactStep=i["contactStep"],
        contactDetail=i["contactDetail"],
        contactBeginTimestamp=i["contactBeginTimestamp"],
        contactEndTimestamp=i["contactEndTimestamp"],
        contactLatitude=i["contactLatitude"],
        contactLongitude=i["contactLongitude"],
        contactAzimuth=i["contactAzimuth"],
        contactElevation=i["contactElevation"],
        contactResolution=i["contactResolution"],
        contactResolutionStatus=i["contactResolutionStatus"]
        )
        db.session.add(contact)
    for j in alerts:
        alert = AlertsModel(
        errorId=j["errorId"],
        errorSeverity=j["errorSeverity"],
        errorCategory=j["errorCategory"],
        errorMessage=j["errorMessage"],
        longMessage=j["longMessage"],
        errorTime=j["errorTime"],
        selected=j["selected"],
        new=j["new"],
        expanded=j["expanded"],
        )
        db.session.add(alert)
    db.session.commit()

# helper to return objects as dictionaries
def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

# Protected Endpoints
@app.route("/contacts", methods=["GET"])
@jwt_required
def Contacts():
    contacts = []
    contacts_query = ContactsModel.query.all()
    for i in contacts_query:
        contact = object_as_dict(i)
        contacts.append(contact)
    return jsonify(contacts), 200

@app.route("/alerts", methods=["GET"])
@jwt_required
def Alerts():
    alerts = []
    alerts_query = AlertsModel.query.all()
    for i in alerts_query:
        alert = object_as_dict(i)
        alerts.append(alert)
    return jsonify(alerts), 200

api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
