from flask import Flask 
from flask_cors import CORS

app = Flask(__name__, instance_relative_config=True)
cors = CORS(app)

app.config.from_object('config')
