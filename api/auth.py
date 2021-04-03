from flask import Blueprint

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    # TODO: get form input request data

    # TODO: check if user exists in database

    # TODO: if user does not exist or if password is wrong, return error message

    # TODO: log in user

    # TODO: return current user
    return "log in route"


@auth.route('/signup', methods=['POST'])
def signup():
    # TODO: get form input request data

    # TODO: check if user exists in database

    # TODO: if user exists then return error message

    # TODO: create new user object from request data

    # TODO: add new user to data base and committ changes

    # TODO: log in new user

    # TODO: return current user
    return "sign up route"


@auth.route('/logout')
# TODO: make protected route
def logout():
    # TODO: logout user
    # TODO: return null user
    return "logout route"
