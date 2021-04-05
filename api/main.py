from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from models.contact import Contact
from models.alert import Alert


main = Blueprint('main', __name__)


@main.route('/')
def index():
    return app.send_static_file('index.html')


@main.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


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
