from flask import Blueprint
from flask_login import login_required, current_user

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return 'Hello, World!'


@main.route('/api/contacts')
@login_required
def contacts():
    # TODO: return contacts data from database
    return "contacts data route"


@main.route('/api/alerts')
@login_required
def alerts():
    # TODO: return alerts data from database
    return "alerts data route"
