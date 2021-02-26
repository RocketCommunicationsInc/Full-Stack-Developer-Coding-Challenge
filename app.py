from flask import Flask, request, jsonify, send_from_directory
import json
import mysql.connector as mysql
import bcrypt
import secrets
import os

app = Flask(__name__, static_folder='./grmfront/dist')


def getuserbyemail(email):
    try:
        db = mysql.connect(
            host = os.getenv('DBHOST'),
            user = os.getenv('DBUSER'),
            passwd = os.getenv('DBPASS'),
            database = os.getenv('DBNAME')
        )
        cursor = db.cursor(buffered=True)
        query = "SELECT * from users WHERE email = %s"
        values = (email, )
        cursor.execute(query, values)
        db.close()
        return cursor.fetchone()
    except:
        return "error"

def getuser(userid):
    try:
        db = mysql.connect(
            host = os.getenv('DBHOST'),
            user = os.getenv('DBUSER'),
            passwd = os.getenv('DBPASS'),
            database = os.getenv('DBNAME')
        )
        cursor = db.cursor(buffered=True)
        query = "SELECT * from users WHERE id = %s"
        values = (userid, )
        cursor.execute(query, values)
        db.close()
        return cursor.fetchone()
    except:
        return "error"

def createtoken(user):
    try:
        db = mysql.connect(
            host = os.getenv('DBHOST'),
            user = os.getenv('DBUSER'),
            passwd = os.getenv('DBPASS'),
            database = os.getenv('DBNAME')
        )
        token = secrets.token_hex(20)
        query = "INSERT into tokens (userid, token) VALUES (%s, %s)"
        values = (user, token)
        cursor = db.cursor(buffered=True)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        db.close()
        return token
    except:
        return False

def checkauth():
        db = mysql.connect(
            host = os.getenv('DBHOST'),
            user = os.getenv('DBUSER'),
            passwd = os.getenv('DBPASS'),
            database = os.getenv('DBNAME')
        )
        token = request.headers.get('authtoken')
        query = "SELECT * from tokens WHERE token = %s"
        values = (token, )
        cursor = db.cursor(buffered=True)
        cursor.execute(query, values)
        db.close()
        if cursor.rowcount > 0:
            record = cursor.fetchone()
            cursor.close()
            return (True, record[1])
        else:
            return False

def getalerts():
    try:
        db = mysql.connect(
            host = os.getenv('DBHOST'),
            user = os.getenv('DBUSER'),
            passwd = os.getenv('DBPASS'),
            database = os.getenv('DBNAME')
        )
        query = "SELECT * from alerts"
        cursor = db.cursor(buffered=True)
        cursor.execute(query)
        alerts = cursor.fetchall()
        cursor.close()
        db.close()
        response = []
        for alert in alerts:
            aresp = {
                'errorId' : alert[0],
                'errorSeverity': alert[1],
                'errorCategory': alert[2],
                'errorMessage': alert[3],
                'longMessage': alert[4],
                'errorTime': alert[5],
                'selected': alert[6],
                'new': alert[7],
                'expanded': alert[8]
            }
            response.append(aresp)
        return response
    except:
        return []

def getcontacts():
    try:
        db = mysql.connect(
            host = os.getenv('DBHOST'),
            user = os.getenv('DBUSER'),
            passwd = os.getenv('DBPASS'),
            database = os.getenv('DBNAME')
        )
        query = "SELECT * from contacts"
        cursor = db.cursor(buffered=True)
        cursor.execute(query)
        contacts = cursor.fetchall()
        cursor.close()
        db.close()
        response = []
        for contact in contacts:
            cresp = {
                '_id' : contact[0],
                'contactId': contact[1],
                'contactStatus': contact[2],
                'contactName': contact[3],
                'contactGround': contact[4],
                'contactSatellite': contact[5],
                'contactEquipment': contact[6],
                'contactState': contact[7],
                'contactStep': contact[8],
                'contactDetail': contact[9],
                'contactBeginTimestamp': contact[10],
                'contactEndTimestamp': contact[11],
                'contactLatitude': contact[12],
                'contactLongitude': contact[13],
                'contactAzimuth': contact[14],
                'contactElevation': contact[15],
                'contactResolution': contact[16],
                'contactResolutionStatus': contact[17]
            }
            response.append(cresp)
        return response
    except:
        return []

@app.route('/refreshdata/', methods=['GET'])
def refresh_data():
    db = mysql.connect(
        host = os.getenv('DBHOST'),
        user = os.getenv('DBUSER'),
        passwd = os.getenv('DBPASS'),
        database = os.getenv('DBNAME')
    )
    query = "TRUNCATE table alerts"
    cursor = db.cursor(buffered=True)
    cursor.execute(query)
    cursor.close()
    query = "TRUNCATE table contacts"
    cursor = db.cursor(buffered=True)
    cursor.execute(query)
    cursor.close()
    fileObject = open("alerts.json", "r")
    jsonContent = fileObject.read()
    jsonObj = json.loads(jsonContent)
    for alert in jsonObj:
        query = "INSERT into alerts (errorId, errorSeverity, errorCategory, errorMessage, longMessage, errorTime, selected, new, expanded) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (alert['errorId'], alert['errorSeverity'], alert['errorCategory'], alert['errorMessage'], alert['longMessage'], alert['errorTime'], alert['selected'], alert['new'], alert['expanded'])
        cursor = db.cursor(buffered=True)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
    fileObject2 = open("contacts.json", "r")
    jsonContent = fileObject2.read()
    jsonObj = json.loads(jsonContent)
    for contact in jsonObj:
        query = "INSERT into contacts (_id, contactId, contactStatus, contactName, contactGround, contactSatellite, contactEquipment, contactState, contactStep, contactDetail, contactBeginTimestamp, contactEndTimestamp, contactLatitude, contactLongitude, contactAzimuth, contactElevation, contactResolution, contactResolutionStatus) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (contact['_id'], contact['contactId'], contact['contactStatus'], contact['contactName'], contact['contactGround'], contact['contactSatellite'], contact['contactEquipment'], contact['contactState'], contact['contactStep'], contact['contactDetail'], contact['contactBeginTimestamp'], contact['contactEndTimestamp'], contact['contactLatitude'], contact['contactLongitude'], contact['contactAzimuth'], contact['contactElevation'], contact['contactResolution'], contact['contactResolutionStatus'])
        cursor = db.cursor(buffered=True)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
    return "complete"

@app.route('/getappdata/', methods=['POST'])
def get_app_data():
    auth = checkauth()
    if auth[0] == True:
        userid = auth[1]
        userdata = getuser(userid)
        user = {
            "userf": userdata[1],
            "userl": userdata[2],
            "userid": userdata[0],
            "useremail": userdata[3]
        }
        alerts = getalerts()
        contacts = getcontacts()
        response = {
            "user": user,
            "alerts": alerts,
            "contacts": contacts
        }
        return jsonify(response)
    else:
        return jsonify({
            "status": "error",
            "message": "noauth"
        })

@app.route('/getalerts/', methods=['POST'])
def get_alerts():
    auth = checkauth()
    if auth[0] == True:
        alerts = getalerts()
        response = {
            "alerts": alerts,
        }
        return jsonify(response)
    else:
        return jsonify({
            "status": "error",
            "message": "noauth"
        })

@app.route('/getcontacts/', methods=['POST'])
def get_contacts():
    auth = checkauth()
    if auth[0] == True:
        contacts = getcontacts()
        response = {
            "contacts": contacts,
        }
        return jsonify(response)
    else:
        return jsonify({
            "status": "error",
            "message": "noauth"
        })


@app.route('/login/', methods=['POST'])
def login_user():
    req_data = request.get_json()
    if req_data:
        record = getuserbyemail(req_data['useremail'])
        storedpw = record[4]
        if(bcrypt.checkpw(req_data['userpass'].encode(), storedpw.encode())):
            return jsonify({
                "status": f"success",
                "message": createtoken(record[0])
            })
        else:
            return jsonify({
                "status": f"error",
                "message": f"Invalid Login"
            })
    else:
        return jsonify({
            "status": f"error",
            "message": f"Invalid Request"
        })


@app.route('/adduser/', methods=['POST'])
def add_user():
    req_data = request.get_json()
    if req_data:
        try:
            userf = req_data['userfirst']
        except:
            return jsonify({
                "status": "error",
                "message": "Please include user's first name"
            })
        try:
            userl = req_data['userlast']
        except:
            return jsonify({
                "status": "error",
                "message": "Please include user's last name"
            })
        try:
            useremail = req_data['useremail']
        except:
            return jsonify({
                "status": "error",
                "message": "Please include user's email"
            })
        try:
            userpass = req_data['userpass']
        except:
            return jsonify({
                "status": "error",
                "message": "Please include a strong password"
            })
        # We good
        hashpw = bcrypt.hashpw(userpass.encode(), bcrypt.gensalt())
        db = mysql.connect(
            host = os.getenv('DBHOST'),
            user = os.getenv('DBUSER'),
            passwd = os.getenv('DBPASS'),
            database = os.getenv('DBNAME')
        )
        cursor = db.cursor()
        query = "INSERT into users (userf, userl, email, password) VALUES (%s, %s, %s, %s)"
        values = (userf, userl, useremail, hashpw)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        db.close()
        getuser = getuserbyemail(useremail)
        token = createtoken(getuser[0])
        return jsonify({
            "status": "success",
            "message": token
        })

    else:
        return jsonify({
            "error": "Invalid Request"
        })

@app.route('/')
def index():
    return send_from_directory('./grmfront/dist/', 'index.html')

@app.route('/dashboard')
def dashboard():
    return send_from_directory('./grmfront/dist/db', 'index.html')

@app.route('/<path:path>')
def catch_all(path):
    try:
        # return app.send_static_file(path)
        return send_from_directory('./grmfront/dist/', path)
    except:
        return "Welcome to GRM"


if __name__ == '__main__':
    app.run(threaded=True)