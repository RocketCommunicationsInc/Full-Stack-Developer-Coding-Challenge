from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager

db = SQLAlchemy()
login = LoginManager()

# # SQL Table Migration Classes
class ContactsModel(db.Model):
    __tablename__ = "contacts"

    # Primary Keys?!?!
    _id = db.Column(db.String(48))
    contactId = db.Column(db.String(48))
    contactStatus = db.Column(db.String(48))
    contactName = db.Column(db.Integer)
    contactGround = db.Column(db.String(36))
    contactSatellite = db.Column(db.String(24))
    contactEquipment = db.Column(db.String(128))
    contactState = db.Column(db.String(24))
    contactStep = db.Column(db.String(48))
    contactDetail = db.Column(db.String(512))
    contactBeginTimestamp = db.Column(db.DateTime())
    contactEndTimestamp = db.Column(db.DateTime())
    contactLatitude = db.Column(db.Float(12))
    contactLongitute = db.Column(db.Float(12))
    contactAzimuth = db.Column(db.Float(12))
    contactElevation = db.Column(db.Float(12))
    contactResolution = db.Column(db.String(48))
    contactResolutionStatus = db.Column(db.String(48))

    # def __repr__(self):
    #     return f"Contact (name = {contactName}, contactId = {contactId})"

class Alerts(db.Model):
    # Primary Keys?!?!?
    errorId = db.Column(db.String(48))
    errorSeverity = db.Column(db.String(48))
    errorCategory = db.Column(db.String(48))
    errorMessage = db.Column(db.String(128))
    longMessage = db.Column(db.String(256))
    errorTime = db.Column(db.DateTime())
    selected = db.Column(db.Boolean())
    new = db.Column(db.Boolean())
    expanded = db.Column(db.Boolean())
    #
    # def __repr__(self):
    #     return f"Error (errorId = {errorId}, errorSeverity = {errorSeverity})"
