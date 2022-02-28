from unicodedata import category
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json
from datetime import datetime
from api.models import *
import pandas as pd

# Create an engine that stores data in the local directory's rocket.db file.
engine = create_engine('sqlite:///rocket.db')

# Create all tables in the engine. 
Base.metadata.create_all(engine)

# Create a new database session.
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

# Define helper functions.

def convert_epoch(value):
    return datetime.datetime.fromtimestamp(int(value) / 1e3)

def try_get_category(value: str):
    result = session.query(AlertCategory).filter(AlertCategory.category == value).first()
    if result is None:
        # Create a new row.
        temp = AlertCategory(category=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result

def try_get_severity(value: str):
    result = session.query(AlertSeverity).filter(AlertSeverity.severity == value).first()
    if result is None:
        # Create a new row.
        temp = AlertSeverity(severity=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result

def try_get_contact_status(value):
    result = session.query(ContactStatus).filter(ContactStatus.status == value).first()
    if result is None:
        # Create a new row.
        temp = ContactStatus(status=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result
    
def try_get_contact_ground(value):
    result = session.query(ContactGround).filter(ContactGround.ground == value).first()
    if result is None:
        # Create a new row.
        temp = ContactGround(ground=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result
    
def try_get_contact_state(value):
    result = session.query(ContactState).filter(ContactState.state == value).first()
    if result is None:
        # Create a new row.
        temp = ContactState(state=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result
    
def try_get_contact_step(value):
    result = session.query(ContactStep).filter(ContactStep.step == value).first()
    if result is None:
        # Create a new row.
        temp = ContactStep(step=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result
    
def try_get_contact_resolution(value):
    result = session.query(ContactResolution).filter(ContactResolution.resolution == value).first()
    if result is None:
        # Create a new row.
        temp = ContactResolution(resolution=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result

def try_get_contact_resolution_status(value):
    result = session.query(ContactResolutionStatus).filter(ContactResolutionStatus.resolutionStatus == value).first()
    if result is None:
        # Create a new row.
        temp = ContactResolutionStatus(resolutionStatus=value)
        session.add(temp)
        session.commit()
        return temp
    else:
        return result
    
    
# Read in the alerts file.
root_dir = os.path.abspath(os.path.join(__file__ ,"../../.."))
alert_json_filename = os.path.join(root_dir, "alerts.json")
with open(alert_json_filename, 'rb') as file:
    alerts_raw = json.load(file)
    for alert in alerts_raw:
        row = Alert()
        row.message = alert['errorMessage']
        row.long_message = alert['longMessage']
        row.time = convert_epoch(alert['errorTime'])
        row.selected = alert['selected']
        row.new = alert['new']
        row.expanded = alert['expanded']
        row.category = try_get_category(alert['errorCategory'])
        row.severity = try_get_severity(alert['errorSeverity'])
        session.add(row)

    # Commit the new records to the database.
    session.commit()


# Read in the contacts file.
root_dir = os.path.abspath(os.path.join(__file__ ,"../../.."))
contacts_json_filename = os.path.join(root_dir, "contacts.json")
with open(contacts_json_filename, 'rb') as file:
    contacts_raw = json.load(file)
    for contact in contacts_raw:
        temp = Contact()
        temp.status = try_get_contact_status(contact['contactStatus'])
        temp.ground = try_get_contact_ground(contact['contactGround'])
        temp.state = try_get_contact_state(contact['contactState'])
        temp.step = try_get_contact_step(contact['contactStep'])
        temp.resolution = try_get_contact_resolution(contact['contactResolution'])
        temp.resolution_status = try_get_contact_resolution_status(contact['contactResolutionStatus'])
        temp._ID = contact['_id']
        temp.contact_id = contact['contactId']
        temp.name = contact['contactName']
        temp.satellite = contact['contactSatellite']
        temp.equipment = contact['contactEquipment']
        temp.detail = contact['contactDetail']
        temp.begin_timestamp = convert_epoch(contact['contactBeginTimestamp'])
        temp.end_timestamp = convert_epoch(contact['contactEndTimestamp'])
        temp.latitude = contact['contactLatitude']
        temp.longitude = contact['contactLongitude']
        temp.azimuth = contact['contactAzimuth']
        temp.elevation = contact['contactElevation']
        session.add(temp)
        
    # Commit the new records to the database.
    session.commit()
        