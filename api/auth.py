from flask import Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    # gets form input request data
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    # checks if user exists in database
    user = User.query.filter_by(email=email).first()
    # if user does not exist or if password is wrong, return error message
    if not user or not check_password_hash(user.password, password):
        # TODO: also need to return error message for wrong password or wrong email
        return "wrong password or email, please try again"

    # logs in user
    login_user(user, remember=remember)
    # TODO: return current user
    return "log in route"


@auth.route('/signup', methods=['POST'])
def signup():
    # gets form input request data
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    # checks if user exists in database
    user = User.query.filter_by(email=email).first()
    # if user exists then return error message
    if user:
        # TODO: also need to return error message for email already existing
        return "email already registered in data base"

    # creates new user object from request data
    new_user = User(email=email, name=name,
                    password=generate_password_hash(password, method='sha256'))

    # TODO: add new user to data base and committ changes

    # TODO: log in new user

    # TODO: return current user
    return "sign up route"


@auth.route('/logout')
@login_required
def logout():
    # logs out user
    logout_user()
    # TODO: return null user
    return "logout route"
