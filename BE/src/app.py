from flask import Flask, jsonify, request, abort
from flask_restful import Api, Resource, fields, marshal_with
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

from models import db, Alerts as AlertsModel, User as UserModel, Contacts as ContactsModel
import os


app = Flask(__name__)

app.config["SECRET_KEY"] = "a secret"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:number13@localhost/rocket"

bcrypt = Bcrypt()
db.init_app(app)
bcrypt.init_app(app)
api = Api(app)

alerts_fields = {
    'id': fields.Integer,
    'errorId': fields.String,
    'errorSeverity': fields.String,
    'errorCategory': fields.String,
    'errorMessage': fields.String,
    'longMessage': fields.String,
    'errorTime': fields.Integer,
    'selected': fields.Boolean,
    'new': fields.Boolean,
    'expanded': fields.Boolean
}

contacts_fields = {
    'id': fields.Integer,
    '_id': fields.String,
    'contactId': fields.String,
    'contactStatus': fields.String,
    'contactName': fields.Integer,
    'contactGround': fields.String,
    'contactSatellite': fields.String,
    'contactEquipment': fields.String,
    'contactState': fields.String,
    'contactStep': fields.String,
    'contactDetail': fields.String,
    'contactBeginTimestamp': fields.Integer,
    'contactEndTimestamp': fields.Integer,
    'contactLatitude': fields.Integer,
    'contactLongitude': fields.Integer,
    'contactAzimuth': fields.Integer,
    'contactElevation': fields.Integer,
    'contactResolution': fields.String,
    'contactResolutionStatus': fields.String,
}

user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'password': fields.String,
}


class Alerts(Resource):
    @marshal_with(alerts_fields)
    def get(self):
        res = AlertsModel.query.all()
        return res


class Contacts(Resource):
    @marshal_with(contacts_fields)
    def get(self):
        res = ContactsModel.query.all()
        return res


class Register(Resource):
    @marshal_with(user_fields)
    def post(self):
        # Make sure username and email were part of the req
        print(request, 'REQ HERE')
        if 'username' in request.json and 'password' in request.json:
            # ! We're assuming here that the request will be formated as such.
            username = request.json['username']
            password = bcrypt.generate_password_hash(
                request.json['password'], 10)

        if username:
            # check if already exists
            user = UserModel.query.filter_by(username=username).first()
            if user:
                return abort(409, message="User already exists.")
            else:
                db.session.add(user)
                db.session.commit()
                return user, 201


class Login(Resource):
    @marshal_with(user_fields)
    def post(self):
        if 'username' in request.json and 'password' in request.json:
            username = request.json['username']
            password = request.json['password']
            user = UserModel.query.filter_by(username=username).first()
            print(user, "USER OBJ HERE")
            if user:
                pw_hash = user.password  # ! Assuming the structure of User
                if bcrypt.check_password_hash(pw_hash, password):
                    # create a token
                    token = create_access_token(identity=username)
                    return {"Message": "Login worked!"}, 201
                else:
                    return {"Message": "Invalid Credentials."}, 401
            else:
                return {"message": "Invalid Credentials(user does not exist)"}, 404

        else:
            return {"Message": "Please provide username and password"}, 400


# already created db, don't need this anymore. Leaving it in so that we know that's how I did it.
# with app.app_context():
#     db.create_all()
# adding resources to api
api.add_resource(Alerts, "/alerts")
api.add_resource(Contacts, "/contacts")
if __name__ == '__main__':
    app.run(debug=True)
