from . import db


class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    _id = db.Column(db.String(200), unique=True)
    contactId = db.Column(db.String(200))
    contactStatus = db.Column(db.String(200))
    contactName = db.Column(db.Integer)
    contactGround = db.Column(db.String(200))
    contactSatellite = db.Column(db.String(200))
    contactEquipment = db.Column(db.String(200))
    contactState = db.Column(db.String(200))
    contactStep = db.Column(db.String(200))
    contactDetail = db.Column(db.Text())
    contactBeginTimestamp = db.Column(db.Integer)
    contactEndTimestamp = db.Column(db.Integer)
    contactLatitude = db.Column(db.Integer)
    contactLongitude = db.Column(db.Integer)
    contactAzimuth = db.Column(db.Integer)
    contactElevation = db.Column(db.Integer)
    contactResolution = db.Column(db.String(200))
    contactResolutionStatus = db.Column(db.String(200))
