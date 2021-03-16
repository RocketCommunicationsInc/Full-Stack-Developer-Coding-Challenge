import databases
from sqlalchemy import DateTime, Boolean, Column, ForeignKey, Numeric, Integer, String
from sqlalchemy.orm import relationship
from fastapi_users import models, FastAPIUsers
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from fastapi_users.authentication import JWTAuthentication

from database import Base, SQLALCHEMY_DATABASE_URL

database = databases.Database(SQLALCHEMY_DATABASE_URL)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    errorId = Column(String, unique=True, index=True)
    errorSeverity = Column(String(50))
    errorCategory = Column(String(50))
    errorMessage = Column(String(200))
    longMessage = Column(String(200))
    errorTime = Column(Integer)
    selected = Column(Boolean)
    new = Column(Boolean)
    expanded = Column(Boolean)

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    _id = Column(String, unique=True, index=True)
    contactId = Column(String, unique=True, index=True)
    contactStatus = Column(String(50))
    contactName = Column(Integer)
    contactGround = Column(String(50))
    contactSatellite = Column(String(50))
    contactEquipment = Column(String(200))
    contactState = Column(String(50))
    contactStep = Column(String(50))
    contactDetail = Column(String(255))
    contactBeginTimestamp = Column(Integer)
    contactEndTimestamp = Column(Integer)
    contactLatitude = Column(Numeric(10, 5))
    contactLongitude = Column(Numeric(10, 5))
    contactAzimuth = Column(Numeric(10, 2))
    contactElevation = Column(Numeric(10, 2))
    contactResolution = Column(String(50))
    contactResolutionStatus = Column(String(50))

