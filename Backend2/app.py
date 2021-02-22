from flask import Flask, render_template, url_for, request, Response, redirect, json, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
cors = CORS(app)
app.config['COR_HEADERS'] = 'Content-Type'

# class OperationResponse:
#     results = []
#     def __init__(self, results):
#         self.results = results

class User(db.Model):
    email = db.Column(db.String(200), primary_key=True)
    password = db.Column(db.String(200))

    def __repr__(self):
        return '<User %r>' % self.email

class Contact(db.Model):
    _id = db.Column(db.String(200), primary_key=True)
    contactId = db.Column(db.String(200))
    contactStatus = db.Column(db.String(200))
    contactName = db.Column(db.Integer)
    contactGround = db.Column(db.String(200))
    contactSatellite = db.Column(db.String(200))
    contactEquipment = db.Column(db.String(300))
    contactState = db.Column(db.String(200))
    contactStep = db.Column(db.String(200))
    contactDetail = db.Column(db.String(400))
    contactBeginTimestamp = db.Column(db.Integer)
    contactEndTimestamp = db.Column(db.Integer)
    contactLatitude = db.Column(db.Integer)
    contactLongitude = db.Column(db.Integer)
    contactAzimuth = db.Column(db.Integer)
    contactElevation = db.Column(db.Integer)
    contactResolution = db.Column(db.String(200))
    contactResolutionStatus = db.Column(db.String(200))

    def __repr__(self):
        return '<Contact %r>' % self._id

    @property
    def serialize(self):
        return {
            '_id': self._id,
            'contactId': self.contactId,
            'contactStatus': self.contactStatus,
            'contactName': self.contactName,
            'contactGround': self.contactGround,
            'contactSatellite': self.contactSatellite,
            'contactEquipment': self.contactEquipment,
            'contactState': self.contactState,
            'contactStep': self.contactStep,
            'contactDetail': self.contactDetail,
            'contactBeginTimestamp': self.contactBeginTimestamp,
            'contactEndTimestamp': self.contactEndTimestamp,
            'contactLatitude': self.contactLatitude,
            'contactLongitude': self.contactLongitude,
            'contactAzimuth': self.contactAzimuth,
            'contactElevation': self.contactElevation,
            'contactResolution': self.contactResolution,
            'contactResolutionStatus': self.contactResolutionStatus,
        }


class Alert(db.Model):
    errorId = db.Column(db.String(200), primary_key=True)
    errorSeverity = db.Column(db.String(200))
    errorCategory = db.Column(db.String(200))
    errorMessage = db.Column(db.String(200))
    longMessage = db.Column(db.String(300))
    errorTime = db.Column(db.Integer)
    selected = db.Column(db.Boolean)
    new = db.Column(db.Boolean)
    expanded = db.Column(db.Boolean)

    def __repr__(self):
         return '<Alert %r>' % self.errorId
    @property
    def serialize(self):
        return {
            'errorId': self.errorId,
            'errorSeverity': self.errorSeverity,
            'errorCategory': self.errorCategory,
            'errorMessage': self.errorMessage,
            'longMessage': self.longMessage,
            'errorTime': self.errorTime,
            'selected': self.selected,
            'new': self.new,
            'expanded': self.expanded,
        }

# utilities
def init_dbs():
    try:
        db.create_all()
        add_alerts()
        add_contacts()
    except:
        return 'An error occurred while init dbs'


def add_alerts():
    alert_data = open('../alerts.json')
    data = json.load(alert_data)
    alerts = []
    for alert in data:
        new_alert = Alert(errorId=alert['errorId'],
                          errorSeverity=alert['errorSeverity'],
                          errorCategory=alert['errorCategory'],
                          errorMessage=alert['errorMessage'],
                          longMessage=alert['longMessage'],
                          errorTime=alert['errorTime'],
                          selected=alert['selected'],
                          new=alert['new'],
                          expanded=alert['expanded'])
        alerts.append(new_alert)
    db.session.add_all(alerts)
    db.session.commit()

def add_contacts():
    contacts_data = open('../contacts.json')
    data = json.load(contacts_data)
    contacts = []
    for contact in data:
        new_contact = Contact(_id=contact['_id'],
                            contactId=contact['contactId'],
                            contactStatus=contact['contactStatus'],
                            contactName=contact['contactName'],
                            contactGround=contact['contactGround'],
                            contactSatellite=contact['contactSatellite'],
                            contactEquipment=contact['contactEquipment'],
                            contactState=contact['contactState'],
                            contactStep=contact['contactStep'],
                            contactDetail=contact['contactDetail'],
                            contactBeginTimestamp=contact['contactBeginTimestamp'],
                            contactEndTimestamp=contact['contactEndTimestamp'],
                            contactLatitude=contact['contactLatitude'],
                            contactLongitude=contact['contactLongitude'],
                            contactAzimuth=contact['contactAzimuth'],
                            contactElevation=contact['contactElevation'],
                            contactResolution=contact['contactResolution'],
                            contactResolutionStatus=contact['contactResolutionStatus'])
        contacts.append(new_contact)
    db.session.add_all(contacts)
    db.session.commit()

# API 
# Get Alerts
@app.route('/alerts')
@cross_origin()
def alerts():
    alerts = Alert.query.all()
    return jsonify(results =[i.serialize for i in alerts])

# Get Contacts
@app.route('/contacts')
@cross_origin()
def contacts():
    contacts = Contact.query.all()
    return jsonify(results =[i.serialize for i in contacts])

# Login
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        login_info = request.get_json()

        user = User.query.filter_by(email=login_info['email']).first()

        if (user.password != login_info['password']):
            return  jsonify(result='Bad')
        else:
            return jsonify(result='Ok')


# Create User
@app.route('/create', methods=['POST'])
@cross_origin()
def create():
    if request.method == 'POST':
        login_info = request.get_json()
        newUser = User(email=login_info['email'], password=login_info['password'])
        # check if user already exists 
        duplicateUser = bool(User.query.filter_by(email=login_info['email']).first())
        # add additional create checks 
        if (duplicateUser):
            return jsonify(result='User already exists')
            
        try:
            db.session.add(newUser)
            db.session.commit()
            return jsonify(result='Ok')
        except: 
            return jsonify(result='An error occurred when creating account')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)