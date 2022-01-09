from datetime import datetime
import json

from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(15), unique=True, index=True, nullable=False)
    password = db.Column(db.Text())
    date_joined = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"User {self.username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    def toDICT(self):
        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.username
        return cls_dict

    def toJSON(self):
        return self.toDICT()

import uuid
def default_uuid():
    return uuid.uuid4().hex

class Contacts(db.Model):
    id = db.Column(db.String(64), primary_key=True, default=default_uuid)
    contact_id = db.Column(db.Text(), nullable=False)
    contact_status = db.Column(db.Text())
    contact_name = db.Column(db.Integer)
    contact_ground = db.Column(db.Text())
    contact_satellite = db.Column(db.Text())
    contact_equipment = db.Column(db.Text())
    contact_state = db.Column(db.Text())
    contact_step = db.Column(db.Text())
    contact_detail = db.Column(db.Text())
    contact_begin_timestamp = db.Column(db.DateTime)
    contact_end_timestamp = db.Column(db.DateTime)
    contact_latitude = db.Column(db.Float)
    contact_longitude = db.Column(db.Float)
    contact_azimuth = db.Column(db.Float)
    contact_elevation = db.Column(db.Float)
    contact_resolution = db.Column(db.Text())
    contact_resolution_status = db.Column(db.Text())

    def toDICT(self):
        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['contactId'] = self.contact_id
        cls_dict['contactStatus'] = self.contact_status
        cls_dict['contactName'] = self.contact_name
        cls_dict['contactGround'] = self.contact_ground
        cls_dict['contactSatellite'] = self.contact_satellite
        cls_dict['contactEquipment'] = self.contact_equipment
        cls_dict['contactState'] = self.contact_state
        cls_dict['contactStep'] = self.contact_step
        cls_dict['contactDetail'] = self.contact_detail
        cls_dict['contactBeginTimestamp'] = self.contact_begin_timestamp
        cls_dict['contactEndTimestamp'] = self.contact_end_timestamp
        cls_dict['contactLatitude'] = self.contact_latitude
        cls_dict['contactLongitude'] = self.contact_longitude
        cls_dict['contactAzimuth'] = self.contact_azimuth
        cls_dict['contactElevation'] = self.contact_elevation
        cls_dict['contactResolution'] = self.contact_resolution
        cls_dict['contactResolutionStatus'] = self.contact_resolution_status
        return cls_dict

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toJSON(self):
        return self.toDICT()
    
    @classmethod
    def select_all(cls):
        return [i.toJSON() for i in cls.query.all()]

class Alerts(db.Model):
    error_id = db.Column(db.String(64), primary_key=True)
    error_severity = db.Column(db.Text())
    error_category = db.Column(db.Text())
    error_message = db.Column(db.Text())
    long_message = db.Column(db.Text())
    error_time = db.Column(db.DateTime)
    selected = db.Column(db.Boolean)
    new = db.Column(db.Boolean)
    expanded = db.Column(db.Boolean)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):
        cls_dict = {}
        cls_dict['errorId'] = self.error_id
        cls_dict['errorSeverity'] = self.error_severity
        cls_dict['errorCategory'] = self.error_category
        cls_dict['errorMessage'] = self.error_message
        cls_dict['longMessage'] = self.long_message
        cls_dict['errorTime'] = self.error_time
        cls_dict['selected'] = self.selected
        cls_dict['new'] = self.new
        cls_dict['expanded'] = self.expanded
        return cls_dict

    def toJSON(self):
        return self.toDICT()

    @classmethod
    def select_all(cls):
        return [i.toJSON() for i in cls.query.all()]
