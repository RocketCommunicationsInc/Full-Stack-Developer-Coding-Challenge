from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

from models import db
 # ContactsModel, AlertsModel, UserModel

app = Flask(__name__)
api = Api(app)
jwt = JWTManager(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/assets.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"


db.init_app(app)

# ---!!! Create Database !!!---
@app.before_first_request
def create_tables():
    db.create_all()

# Contacts endpoint
@app.route("/contacts", methods=["GET"])
@jwt_required
def Contacts():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
#
# # @jwt_required
# class Alerts(Resource):
#     def get(self):
#         # check for valid credentials
#         current_user = get_jwt_identity()
#         return jsonify(logged_in_as=current_user), 200
from endpoints import Alerts, Signup, Login

api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
# api.add_resource(Contacts, "/contacts", endpoint = "contacts")
api.add_resource(Alerts, "/alerts")



if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
