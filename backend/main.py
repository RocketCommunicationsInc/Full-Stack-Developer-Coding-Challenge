from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


# # SQL Table Migration Classes
class ContactsModel(db.Model):
    _id = db.Column(db.String, primary_key=True)
    contactId = db.Column(db.String(48))
    contactStatus = db.Column(db.String(48))
    contactName = db.Column(db.Integer())
    contactGround = db.Column(db.String(36))
    contactSatellite = db.Column(db.String(24))
    contactEquipment = db.Column(db.String(128))
    contactState = db.Column(db.String(24))
    contactStep = db.Column(db.String(48))
    contactDetail = db.Column(db.String(512))
    contactBeginTimestamp = db.Column(db.DateTime())
    contactEndTimestamp = db.Column(db.DateTime())
    contactLatitude = db.Column(db.Float(12))
    contactLongitute = db.Column(db.Float(12))
    contactAzimuth = db.Column(db.Float(12))
    contactElevation = db.Column(db.Float(12))
    contactResolution = db.Column(db.String(48))
    contactResolutionStatus = db.Column(db.String(48))

class Alerts(db.Model):
    errorId = db.Column(db.String(48), primary_key=True)
    errorSeverity = db.Column(db.String(48))
    errorCategory = db.Column(db.String(48))
    errorMessage = db.Column(db.String(128))
    longMessage = db.Column(db.String(256))
    errorTime = db.Column(db.DateTime())
    selected = db.Column(db.Boolean())
    new = db.Column(db.Boolean())
    expanded = db.Column(db.Boolean())



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
