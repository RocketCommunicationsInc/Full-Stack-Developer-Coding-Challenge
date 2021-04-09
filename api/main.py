from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from models.contact import Contact
from models.alert import Alert

from functools import wraps
from flask import g, request, redirect, url_for


main = Blueprint('main', __name__)


def check_for_http(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.url.startswith('http://'):
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)
        return f(*args, **kwargs)
    return decorated_function


@main.route('/')
def index():
    return "Home route of Rocket Comms Challenge API, please use client to make requests"


@main.errorhandler(404)
def not_found(e):
    return "route not found"


@main.route('/api/contacts', methods=['GET'])
@login_required
@check_for_http
def contacts():
    # returns contacts data from database
    response = Contact.get_delete_put_post()
    response.headers.add('Access-Control-Allow-Orgin', '*')
    return response


@main.route('/api/alerts', methods=['GET'])
@check_for_http
@login_required
def alerts():
    # returns alerts data from database
    response = Alert.get_delete_put_post()
    response.headers.add('Access-Control-Allow-Orgin', '*')
    return response
