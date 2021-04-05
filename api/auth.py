from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from api.models.user import User
from api import db
import json

auth = Blueprint('auth', __name__)


@auth.route('/api/login', methods=['POST'])
def login():
    # gets form input request data
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    # checks if user exists in database
    user = User.query.filter_by(email=email).first()

    # if user does not exist or if password is wrong, return error message
    if not user or not check_password_hash(user.password, password):
        # returns error message for wrong email or password
        return json.dumps({"error": "Wrong password or email, please try again"})

    # logs in user
    login_user(user, remember=remember)
    # returns current user

    user_name = current_user.__getattr__("name")
    response = jsonify({'name': user_name})
    # response.headers.add('Access-Control-Allow-Orgin', '*')
    # Set-Cookie: promo_shown=1; SameSite=Lax
    return response


@ auth.route('/api/signup', methods=['POST'])
def signup():
    # gets form input request data
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    # if user or email, name or password was not provided, return error message
    if not email or not name or not password:
        # returns error message for wrong email or password
        return json.dumps({"error": "Please provide an email, password and name"})

    # checks if user exists in database
    user = User.query.filter_by(email=email).first()
    # if user exists then return error message
    if user:
        # returns error message for email already existing
        return json.dumps({"error": "Email already registered in data base"})

    # creates new user object from request data
    new_user = User(email=email, name=name,
                    password=generate_password_hash(password, method='sha256'))

    # adds new user to data base and committ changes
    db.session.add(new_user)
    db.session.commit()

    # logs in new user
    login_user(new_user)

    user_name = current_user.__getattr__("name")
    response = jsonify({'name': user_name})
    response.headers.add('Access-Control-Allow-Orgin', '*')
    return response


@ auth.route('/api/logout')
@ login_required
def logout():
    # logs out user
    logout_user()

    return "user logged out"
