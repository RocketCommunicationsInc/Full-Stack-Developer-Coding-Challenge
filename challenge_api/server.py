import json
import os
import psycopg2
from flask import Flask, jsonify, request, render_template, Response
from flask_cors import cross_origin
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
auth = HTTPBasicAuth()
app.config['DEBUG'] = True

@auth.verify_password
def verify_password(username, password):
    user = select('select credential from users where username=%s;', [username])
    user = user[0][0]
    print(user)
    if user:
        valid = check_password_hash(user, password)
        if valid:
            return username
        else:
            return False

def select(query, params):
    try:
        conn = psycopg2.connect(
            host=os.environ["PG_HOST"],
            user=os.environ["PG_USER"],
            password=os.environ["PG_PASS"],
            database=os.environ["PG_DB"]
        )

        cur = conn.cursor()
        cur.execute(query, (params))

        data = cur.fetchall()
        print(query)
        return data

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
@cross_origin(origin='localhost' ,headers=['Content- Type','Authorization'])
def register():
    data = json.loads(request.data.decode('utf-8'))
    user = data['user']
    password = generate_password_hash(data['password'])
    new_user = insert('INSERT INTO users (username, credential) values(%s, %s)', [user, password])

    return Response(json.dumps({ 'username': user, 'password': data['password'] }), status=new_user['status'], mimetype='application/json')

@app.route('/login', methods=['POST'])
@cross_origin(origin='localhost' ,headers=['Content- Type','Authorization'])
def login():
    data = json.loads(request.data.decode('utf-8'))
    user = data['user']
    password = data['password']
    result = verify_password(user, password)
    if result:
        return Response(json.dumps({ 'username': user, 'password': password }), status=200, mimetype='application/json')
    else:
        return Response({ 'Unauthorized' }, status=401)

@app.route('/data/alerts', methods=['GET'])
@auth.login_required
def alerts():
    result = {}
    with open('./alerts.json') as data:
        result = json.load(data)
        return jsonify(result)

@app.route('/data/contacts', methods=['GET'])
@auth.login_required
def contacts():
    result = {}
    with open('./contacts.json') as data:
        result = json.load(data)
        return jsonify(result)

if __name__ == '__main__':
    app.run()
