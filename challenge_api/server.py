import json
import os
import psycopg2
import psycopg2.extras
from flask import Flask, jsonify, request, render_template, Response
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
cors_config = {
    "allow_headers": ["Authorization"],
    "methods": ["OPTIONS", "GET", "POST"]
}
cors = CORS(app, supports_credentials=True, resource={ "/*": cors_config })
auth = HTTPBasicAuth()
app.config['DEBUG'] = True
app.config['CORS_HEADERS'] = 'Content-Type'

alert_fields = ["errorId", "errorSeverity", "errorCategory", "errorMessage", "longMessage", "errorTime", "selected", "new", "expanded"]
contact_fields = ["id", "contactId", "contactStatus", "contactName", "contactGround", "contactSatellite", "contactEquipment", "contactState", "contactStep", "contactDetail", "contactBeginTimestamp", "contactEndTimestamp", "contactLatitude", "contactLongitude", "contactAzimuth", "contactElevation", "contactResolution", "contactResolutionStatus"]

@auth.verify_password
def verify_password(username, password):
    print(username, password)
    user = select(["credential"], "users", "where username=%s", [username])
    print(user)
    print(auth.username())
    user = user[0]["credential"]
    print('post tuple resolution')
    print(user)
    if user:
        valid = check_password_hash(user, password)
        if valid:
            print('valid: ' + username)
            return username
        else:
            return False

def select(fields, table, where, params):
    try:
        query = 'select '
        for field in fields:
            query += '"' + field + '", '

        query = query.removesuffix(', ')
        query += ' from ' + table
        query += ' ' + where
        print(query)
        
        conn = psycopg2.connect(
            host=os.environ["PG_HOST"],
            user=os.environ["PG_USER"],
            password=os.environ["PG_PASS"],
            database=os.environ["PG_DB"]
        )

        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute(query, (params))

        data = cur.fetchall()
        
        parsed_records = []

        for row in data:
            new_obj = {}
            for field in fields:
                new_obj[field] = row[field]
            parsed_records.append(new_obj)

        print(query)
        return parsed_records

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

def insert(query, values):
    try:
        conn = psycopg2.connect(
            host=os.environ["PG_HOST"],
            user=os.environ["PG_USER"],
            password=os.environ["PG_PASS"],
            database=os.environ["PG_DB"]
        )

        cur = conn.cursor()
        cur.execute(query, (values[0], values[1]))
        conn.commit()
        return { 'status': 200 }
 
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return { 'status': 500, 'error': error }

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html', flask_token='hello there')
    #return '<h1>YOU ARE HOME ' + auth.current_user() + '/h1>'

@app.route('/register', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type','Authorization'])
def register():
    data = json.loads(request.data.decode('utf-8'))
    user = data['user']
    password = generate_password_hash(data['password'])
    new_user = insert('INSERT INTO users (username, credential) values(%s, %s)', [user, password])

    return Response(json.dumps({ 'username': user, 'password': data['password'] }), status=new_user['status'], mimetype='application/json')

@app.route('/login', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type','Authorization'])
def login():
    data = json.loads(request.data.decode('utf-8'))
    user = data['user']
    password = data['password']
    result = verify_password(user, password)
    if result:
        return Response(json.dumps({ 'username': user, 'password': password }), status=200, mimetype='application/json')
    else:
        return Response({ 'Unauthorized' }, status=401)

@app.route('/data/alerts', methods=['GET', 'OPTIONS'])
@auth.login_required
def alerts():
    result = select(alert_fields, "alerts", "", [])
    print(result[0])
    print(result[0]['errorId'])
    resp = Response(json.dumps(result), status=200, mimetype='application/json')
    return resp

@app.route('/data/contacts', methods=['GET', 'OPTIONS'])
@auth.login_required
def contacts():
    result = select(contact_fields, "contacts", "", [])
    resp = Response(json.dumps(result), status=200, mimetype='application/json')
    return resp


if __name__ == '__main__':
    app.run()
