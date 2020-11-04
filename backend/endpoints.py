from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_restful import Resource
from flask import request

from models import db, UserModel, ContactsModel, AlertsModel


# # Contacts endpoint
# @app.route("/contacts", methods=["GET"])
# @jwt_required
# def Contacts():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200

# @jwt_required
class Alerts(Resource):
    def get(self):
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200

class Signup(Resource):
    def post(self):
        email = request.form["email"]
        password = request.form["password"]
        # Check if user exists
        user_test = UserModel.query.filter_by(email=email).first()
        if user_test:
            return {"message":"User Already Exists"}, 409
        else :
            user = UserModel(email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            return {"message":"Account Successfully Created"}, 201
        # return {email: email, password: password}

class Login(Resource):
    def post(self):
        if request.is_json:
            print("Request is JSON")
            email = request.json["email"]
            password = request.json["password"]
        else:
            print("Request is NOT JSON")
            email = request.form["email"]
            password = request.form["password"]
        # Find User Record
        user = UserModel.query.filter_by(email=email).first()
        if user:
            if user.check_password(password):
                access_token = create_access_token(identity=email)
                return {"message":"Login Success", "access_token":access_token}, 201
            else:
                return {"message":"Email or Password Incorrect"}, 401
        else:
            return {"message": "No user found with requested email"}
