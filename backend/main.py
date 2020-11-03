from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)


# SQL Table Migration Classes
class ContactsModel(db.Model):
    _id = db.Column(db.String, primary_key=True)
    contactId = db.Column(db.String(40))
    contactStatus = db.Column(db.String(20))
    contactName = db.Column(db.Integer(12))
    contactGround = db.Column(db.String(36))
    contactSatellite = db.Column(db.String(24))
    contactEquipment = db.Column(db.String(128))
    contactState = db.Column(db.String(24))
    contactStep = db.Column(db.String(48))
    contactDetail = db.Column(db.String(512))
    contactBeginTimestamp = db.Column(db.Integer(24))
    contactEndTimestamp = db.Column(db.Integer(24))
    contactLatitude = db.Column(db.Float(12))
    contactLongitute = db.Column(db.Float(12))
    contactAzimuth = db.Column(db.Float(12))
    contactElevation = db.Column(db.Float(12))
    contactResolution = db.Column(db.String(48))
    contactResolutionStatus = db.Column(db.String(48))
    


# Contacts endpoint
class Contacts(Resource):
    def get(self):
        return {"data": "Hello World"}

# class HelloWorld(Resource):
#     def get(self):
#         return {"data": "Hello World"}


# api.add_resource(HelloWorld, "/helloworld")

api.add_resource(Contacts, "/contacts/<int:contact_id>")

if __name__ == "__main__":
    app.run(debug=True)
