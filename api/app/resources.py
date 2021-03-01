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
  user = db_accessor.do_query(queries.select_user, (request.json.get('username'), request.json.get('password')))
  
  response = [] 
  
  if models.user_model(user):
    response.append({"message": "authenticated"}), 200

  return jsonify(response) 

@app.route('/users/register', methods=['PUT'])
def register_user():
  response = []
  check_existance = db_accessor.do_query(queries.select_user, (request.json.get('username'), request.json.get('password')))
  
  if not models.user_model(check_existance):
    db_accessor.do_insert(queries.insert_user, (request.json.get('username'), request.json.get('password')))

    user = db_accessor.do_query(queries.select_user, (request.json.get('username'), request.json.get('password')))
    
    if models.user_model(user):
      response.append({"message": "account created"})
    else:
      response.append({"message": "account could not be created"})
      return jsonify(response), 400
  else: 
    response.append({"message": "account not created because it already exists"})
    return jsonify(response), 400

  return jsonify(response), 201
