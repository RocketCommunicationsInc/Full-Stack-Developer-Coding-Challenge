from hashlib import new
import os
import sys
from time import time
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
 
Base = declarative_base()

    
class AlertSeverity(Base):
    __tablename__ = 'alert_severity'
    id = Column(Integer, primary_key=True)
    severity = Column(String(50), nullable=False)

class AlertCategory(Base):
    __tablename__ = 'alert_category'
    id = Column(Integer, primary_key=True)
    category = Column(String(50), nullable=False)

class Alert(Base):
    __tablename__ = 'alert'
    id = Column(Integer, primary_key=True)
    cateogry_id = Column(Integer, ForeignKey('alert_category.id'))
    category = relationship(AlertCategory)
    severity_id = Column(Integer, ForeignKey('alert_severity.id'))
    severity = relationship(AlertSeverity)
    message = Column(String(250), nullable=False) 
    long_message = Column(String(500), nullable=False)
    time = Column(DateTime, default=datetime.datetime.utcnow)
    selected = Column(Boolean)
    new = Column(Boolean)
    expanded = Column(Boolean)


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

if __name__ == "__main__":
    # Create an engine that stores data in the local directory's rocket.db file.
    engine = create_engine('sqlite:///rocket.db')
    
    # Create all tables in the engine. 
    Base.metadata.create_all(engine)