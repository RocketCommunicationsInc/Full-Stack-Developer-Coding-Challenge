from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import psycopg2
import json
import os
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
    
def connect():
    conn = None
    try:
        print('Connecting to database')
        conn = psycopg2.connect(
            host=os.environ["PG_HOST"],
            user=os.environ["PG_USER"],
            password=os.environ["PG_PASS"],
            database=os.environ["PG_DB"]
        )

        cur = conn.cursor()
        cur.execute('SELECT version()')

        db_version = cur.fetchone()
        print(db_version)

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

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
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return error

@app.route('/', methods=['GET'])
@auth.login_required
def home():
    return '<h1>YOU ARE HOME ' + auth.current_user() + '/h1>'

@app.route('/register', methods=['POST'])
def register():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    user = data['user']['username']
    password = generate_password_hash(data['user']['password'])
    new_user = insert('INSERT INTO users (username, credential) values(%s, %s)', [user, password])
    return jsonify({ 'message': str(new_user) })

@app.route('/data/alerts', methods=['GET'])
def alerts():
    result = {}
    with open('./alerts.json') as data:
        result = json.load(data)
        return jsonify(result)

@app.route('/data/contacts', methods=['GET'])
def contacts():
    result = {}
    with open('./contacts.json') as data:
        result = json.load(data)
        return jsonify(result)

if __name__ == '__main__':
    connect()
    app.run()
