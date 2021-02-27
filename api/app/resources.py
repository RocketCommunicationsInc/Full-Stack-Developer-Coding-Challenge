from app import app
from app import db_accessor
from app import queries
from app import models
from flask import request, jsonify

@app.route('/alerts', methods=['GET'])
def get_all_alerts():
  alerts = db_accessor.do_query(queries.select_alerts, None)
  
  response = []
  for alert in alerts:
    response.append(models.alert_model(alert))

  return jsonify(response)

@app.route('/contacts', methods=['GET'])
def get_all_contacts():
  contacts = db_accessor.do_query(queries.select_contacts, None)
  
  response = []
  for contact in contacts:
    response.append(models.contact_model(contact))

  return jsonify(response)

@app.route('/users/login', methods=['POST'])
def authenticate_user():
  # print(request.json.get('username'))
  user = db_accessor.do_query(queries.select_user, (request.json.get('username'), request.json.get('password')))
  
  response = [] 
  
  if (models.user_model(user) != None):
    response.append({"response": 200, "message": "authenticated"})

  return jsonify(response) 

@app.route('/users/register', methods=['PUT'])
def register_user():
  return
