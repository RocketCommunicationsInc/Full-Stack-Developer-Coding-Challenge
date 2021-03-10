from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import psycopg2
import os

app = Flask(__name__)
api = Api(app)

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

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

class App(Resource):
    def get(self, path):
        print(path)
        return jsonify({'message': 'hello world'})

    def post(self):
        data = request.get_json()
        return jsonify({'data': data}),


api.add_resource(App, '/')

if __name__ == '__main__':
    connect()
    app.run(debug = True)