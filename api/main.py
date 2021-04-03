from flask import Blueprint

main = Blueprint('main', __name__)


@main.route('/')
def hello_world():
    return 'Hello, World!'


@main.route('/contacts')
# TODO: make protected route
def index():
    # TODO: return contacts data from database
    return "contacts data route"


@main.route('/alerts')
# TODO: make protected route
def profile():
    # TODO: return alerts data from database
    return "alerts data route"
