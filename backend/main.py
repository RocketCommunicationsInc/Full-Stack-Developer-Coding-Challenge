from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
# from models import login

# from models import ContactsModel, AlertsModel, UserModel

# from migrations.contacts import ContactsModel

app = Flask(__name__)
api = Api(app)
jwt = JWTManager(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/assets.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)

class ContactsModel(db.Model):
    __tablename__ = "contacts"

    # Primary Keys?!?!
    id = db.Column(db.Integer, primary_key=True)
    _id = db.Column(db.String(48))
    contactId = db.Column(db.String(48))
    contactStatus = db.Column(db.String(48))
    contactName = db.Column(db.Integer)
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

    # def __repr__(self):
    #     return f"Contact (name = {contactName}, contactId = {contactId})"

class AlertsModel(db.Model):
    __tablename__ = "alerts"

    id = db.Column(db.Integer, primary_key=True)
    errorId = db.Column(db.String(48))
    errorSeverity = db.Column(db.String(48))
    errorCategory = db.Column(db.String(48))
    errorMessage = db.Column(db.String(128))
    longMessage = db.Column(db.String(256))
    errorTime = db.Column(db.DateTime())
    selected = db.Column(db.Boolean())
    new = db.Column(db.Boolean())
    expanded = db.Column(db.Boolean())
    #
    # def __repr__(self):
    #     return f"Error (errorId = {errorId}, errorSeverity = {errorSeverity})"

class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(), nullable=False)

    def check_password(self, password):
        return check_password_hash(password, self.password_hash)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

# db.init_app(app)

# # Auth initializers
# login.init_app(app)
# # Set default unauthenticated page
# login.login_view = 'login'

# ---!!! Create Database !!!---
@app.before_first_request
def create_tables():
    db.create_all()

# Contacts = ContactsModel()
# Alerts = AlertsModel()

# ---!!! Create Database !!!---
# NOTE will write over existing, comment out after first use
# db.create_all()

# Contacts endpoint
class Contacts(Resource):
    def get(self):
        return {"data": "Hello World"}

class Alerts(Resource):
    def get(self):
        # check for valid credentials
        return {"data": "Hello World"}

class Signup(Resource):
    def post(self, credentials):
        email = request.form["email"]
        print(credentials)
        print(email)
        # Check if user exists
        user_test = UserModel.query.filter_by(email=email).first()
        if user_test:
            return jsonify(message="User Already Exists"), 409
        else :
            user = UserModel(email=email, password=UserModel.set_password(request.form["password"]))
            db.session.add(user)
            db.session.commit()

class Login(Resource):
    def post(self, credentials):
        return {}



api.add_resource(Contacts, "/contacts/<int:contact_id>")
api.add_resource(Alerts, "/alerts/<int:alert_id>")



if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
