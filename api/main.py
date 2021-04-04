from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from .models.contact import Contact
from .models.alert import Alert


main = Blueprint('main', __name__)

# temporary route until front end established


@main.route('/')
def index():
    return 'Hello, World!'


@main.route('/api/contacts')
@login_required
def contacts():
    # returns contacts data from database
    response = Contact.get_delete_put_post()
    return response


@main.route('/api/alerts')
@login_required
def alerts():
    # returns alerts data from database
    response = Alert.get_delete_put_post()
    return response
