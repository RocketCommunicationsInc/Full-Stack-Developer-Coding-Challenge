from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from api.models.contact import Contact
from api.models.alert import Alert


main = Blueprint('main', __name__)


@main.route('/')
def index():
    return "Home route of Rocket Comms Challenge API, please use client to make requests"


@main.errorhandler(404)
def not_found(e):
    return "route not found"


@main.route('/api/contacts')
@login_required
def contacts():
    # returns contacts data from database
    response = Contact.get_delete_put_post()
    response.headers.add('Access-Control-Allow-Orgin', '*')
    return response


@main.route('/api/alerts')
@login_required
def alerts():
    # returns alerts data from database
    response = Alert.get_delete_put_post()
    response.headers.add('Access-Control-Allow-Orgin', '*')
    return response
