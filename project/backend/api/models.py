from hashlib import new
import os
import sys
from time import time
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from pydantic import BaseModel
import string    
import random # define the random module  
 
Base = declarative_base()

    
class AlertSeverity(Base):
    __tablename__ = 'alert_severity'
    id = Column(Integer, primary_key=True)
    severity = Column(String(50), nullable=False)
    alerts = relationship("Alert", back_populates="severity")

class AlertCategory(Base):
    __tablename__ = 'alert_category'
    id = Column(Integer, primary_key=True)
    category = Column(String(50), nullable=False)
    alerts = relationship("Alert", back_populates="category")

class Alert(Base):
    __tablename__ = 'alert'
    # Fields
    id = Column(Integer, primary_key=True)
    cateogry_id = Column(Integer, ForeignKey('alert_category.id'))
    severity_id = Column(Integer, ForeignKey('alert_severity.id'))
    message = Column(String(250), nullable=False) 
    long_message = Column(String(500), nullable=False)
    time = Column(DateTime, default=datetime.datetime.utcnow)
    selected = Column(Boolean)
    new = Column(Boolean)
    expanded = Column(Boolean)
    
    # Relationships
    category = relationship("AlertCategory", back_populates="alerts")
    severity = relationship("AlertSeverity", back_populates="alerts")
    
    # Methods
    def to_json(self):
        data = {
            "message": self.message,
            "long_message": self.long_message,
            "time": self.time,
            "expanded": self.expanded,
            "selected": self.selected,
            "new": self.new,
            "category": {
                "id": self.category.id,
                "category": self.category.category,
                "display": self.category.category.title()
            },
            "severity": {
                "id": self.severity.id,
                "severity": self.severity.severity,
                "display": self.severity.severity.title()
            }
        }
        return data


class ContactStatus(Base):
    __tablename__ = 'contact_status'
    id = Column(Integer, primary_key=True)
    status = Column(String(50), nullable=False)

class ContactGround(Base):
    __tablename__ = 'contact_ground'
    id = Column(Integer, primary_key=True)
    ground = Column(String(50), nullable=False)
    
class ContactState(Base):
    __tablename__ = 'contact_state'
    id = Column(Integer, primary_key=True)
    state = Column(String(50), nullable=False)

class ContactStep(Base):
    __tablename__ = 'contact_step'
    id = Column(Integer, primary_key=True)
    step = Column(String(50), nullable=False)

class ContactResolution(Base):
    __tablename__ = 'contact_resolution'
    id = Column(Integer, primary_key=True)
    resolution = Column(String(50), nullable=False)
    
class ContactResolutionStatus(Base):
    __tablename__ = 'contact_resolution_status'
    id = Column(Integer, primary_key=True)
    resolutionStatus = Column(String(50), nullable=False)

class Contact(Base):
    __tablename__ = "contact"
    id = Column(Integer, primary_key=True)
    # Fields
    _ID = Column(String(50), nullable=False)
    contact_id = Column(String(50), nullable=False)
    status_id = Column(Integer, ForeignKey('contact_status.id'))
    name = Column(Integer, nullable=False)
    ground_id = Column(Integer, ForeignKey('contact_ground.id'))
    satellite = Column(String(50), nullable=False)
    equipment = Column(String(250), nullable=False)
    state_id = Column(Integer, ForeignKey('contact_state.id'))
    step_id = Column(Integer, ForeignKey('contact_step.id'))
    detail = Column(String(500), nullable=False)
    begin_timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    end_timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    azimuth = Column(Float, nullable=False)
    elevation = Column(Float, nullable=False)
    resolution_id = Column(Integer, ForeignKey('contact_resolution.id'))
    resolution_status_id = Column(Integer, ForeignKey('contact_resolution_status.id'))

    # Relationships
    status = relationship(ContactStatus)
    state = relationship(ContactState)
    ground = relationship(ContactGround)
    step = relationship(ContactStep)
    resolution = relationship(ContactResolution)
    resolution_status = relationship(ContactResolutionStatus)
    
    # Methods
    def to_json(self):
        data = {
            "id": self.id,
            "_id": self._ID,
            "contactId": self.contact_id,
            "status": {
                "id": self.status,
                "status": self.status.status,
                "display": self.status.status.title()
            },
            "name": self.name,
            "ground": {
                "id": self.ground.id,
                "ground": self.ground.ground
            },
            "satellite": self.satellite,
            "equipment": self.equipment,
            "state": {
                "id": self.state.id,
                "state": self.state.state
            },
            "step": {
                "id": self.step.id,
                "step": self.step.step
            },
            "detail": self.detail,
            "begin_timestamp": self.begin_timestamp,
            "end_timestamp": self.end_timestamp,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "azimuth": self.azimuth,
            "elevation": self.elevation,
            "resultion": {
                "id": self.resolution.id,
                "resolution": self.resolution.resolution
            },
            "resolution_status": {
                "id": self.resolution_status.id,
                "resolution_status": self.resolution_status.resolutionStatus
            }
        }
        
        return data
    
class Agent(Base):
    __tablename__ = "Agent"
    id = Column(Integer, primary_key=True)
    # Fields
    email = Column(String(250), nullable=False)
    firstname = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    passwordhash = Column(String(150), nullable=False)
    passwordsalt = Column(String(12), nullable=False)

    @staticmethod
    def create_salt(count):
        ran = ''.join(random.choices(string.ascii_letters + string.digits, k = count))    
        return str(ran)
    
class UserRegistration(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    

if __name__ == "__main__":
    # Create an engine that stores data in the local directory's rocket.db file.
    engine = create_engine('sqlite:///rocket.db')
    
    # Create all tables in the engine. 
    Base.metadata.create_all(engine)
    