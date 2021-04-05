from __init__ import db
from flask_serialize import FlaskSerializeMixin


class Contact(FlaskSerializeMixin, db.Model):
    __tablename__ = 'contact'
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
    contactBeginTimestamp = db.Column(db.BigInteger)
    contactEndTimestamp = db.Column(db.BigInteger)
    contactLatitude = db.Column(db.Float)
    contactLongitude = db.Column(db.Float)
    contactAzimuth = db.Column(db.Float)
    contactElevation = db.Column(db.Float)
    contactResolution = db.Column(db.String(200))
    contactResolutionStatus = db.Column(db.String(200))

    def __init__(self, _id, contactId, contactStatus, contactName, contactGround, contactSatellite, contactEquipment, contactState, contactStep, contactDetail, contactBeginTimestamp, contactEndTimestamp, contactLatitude, contactLongitude, contactAzimuth, contactElevation, contactResolution, contactResolutionStatus):
        self._id = _id
        self.contactId = contactId
        self.contactStatus = contactStatus
        self.contactName = contactName
        self.contactGround = contactGround
        self.contactSatellite = contactSatellite
        self.contactEquipment = contactEquipment
        self.contactState = contactState
        self.contactStep = contactStep
        self.contactDetail = contactDetail
        self.contactBeginTimestamp = contactBeginTimestamp
        self.contactEndTimestamp = contactEndTimestamp
        self.contactLatitude = contactLatitude
        self.contactLongcontactLongitude = contactLongitude
        self.contactAzimuth = contactAzimuth
        self.contactElevation = contactElevation
        self.contactResolution = contactResolution
        self.contactResolutionStatus = contactResolutionStatus
