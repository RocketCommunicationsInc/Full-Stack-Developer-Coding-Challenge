# from datetime import datetime, timezone, timedelta

# from functools import wraps

from flask import request, jsonify
from flask_jwt_extended.utils import get_jwt_identity
from flask_restx import Api, Resource, fields
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, jwt_required, unset_jwt_cookies

from .models import Users, Alerts, Contacts

rest_api = Api(version="1.0", title="Rocket API", doc=False)


"""
  Flask-Restx models for api request and response data
"""

signup_model = rest_api.model('SignUpModel', {
  "username": fields.String(required=True, min_length=4, max_length=15),
  "password": fields.String(required=True, min_length=4, max_length=128)
  })

login_model = rest_api.model('LoginModel', {
  "username": fields.String(required=True,),
  "password": fields.String(required=True,)
  })


"""
  Flask-Restx routes
"""
@rest_api.route('/users/register')
class Register(Resource):
  """
     Creates a new user by taking 'signup_model' input
  """

  @rest_api.expect(signup_model, validate=True)
  def post(self):
    req_data = request.get_json()

    _username = req_data.get("username")
    _password = req_data.get("password")
    user_exists = Users.get_by_username(_username)
    if user_exists:
      return {"success": False,
          "msg": "Username is already taken"}, 400

    new_user = Users(username=_username)

    new_user.set_password(_password)
    new_user.save()

    access_token = create_access_token(identity=new_user.username)
    refresh_token = create_refresh_token(identity=new_user.username)
    response = jsonify({
        "success": True,
        "userID": new_user.id,
        "username": new_user.username,
        "msg": "The user was successfully registered"
        })
      
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response


@rest_api.route('/users/login')
class Login(Resource):
  """
     Login user by taking 'login_model' input and return JWT token
  """

  @rest_api.expect(login_model, validate=True)
  def post(self):

    req_data = request.get_json()
    _username = req_data.get("username")
    _password = req_data.get("password")

    user_exists = Users.get_by_username(_username)

    if not user_exists:
      return {"success": False,
          "msg": "Invalid credentials"}, 400

    if not user_exists.check_password(_password):
      return {"success": False,
          "msg": "Invalid credentials"}, 400

    response = jsonify(
      {
        "success": True,
        "user": user_exists.toJSON()
        }
      )
    access_token = create_access_token(identity=user_exists.username)
    refresh_token = create_refresh_token(identity=user_exists.username)
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response

@rest_api.route('/users/logout')
class LogoutUser(Resource):
  """
     Logs out User
  """

  # @jwt_required()
  def post(self):

    response = jsonify({"success": True})
    unset_jwt_cookies(response)
    return response

@rest_api.route('/items/contacts')
class ContactRoutes(Resource):
  """
  Gets all contacts
  """
  # @jwt_required()
  def get(self):
    return jsonify(Contacts.select_all())

@rest_api.route('/auth')
class IsAuth(Resource):
  """
  Tells if user is authorized or not
  """
  @jwt_required()
  def get(self):
    current_user = get_jwt_identity()
    response = jsonify(logged_in_as=current_user)
    return response

@rest_api.route('/items/alerts')
class AlertRoutes(Resource):
  """
  Gets all alerts
  """
  def get(self):
    return jsonify(Alerts.select_all())