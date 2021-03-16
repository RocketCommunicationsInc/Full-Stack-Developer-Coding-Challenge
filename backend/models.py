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

class User(models.BaseUser):
    pass

class UserCreate(models.BaseUserCreate):
    pass

class UserUpdate(User, models.BaseUserUpdate):
    pass

class UserDB(User, models.BaseUserDB):
    pass

class UserTable(Base, SQLAlchemyBaseUserTable):
    pass

users = UserTable.__table__
user_db = SQLAlchemyUserDatabase(UserDB, database, users)
SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxNTg1ODczNiwiaWF0IjoxNjE1ODU4NzM2fQ.sBgHoyWOByqWPXLj611kb0yf7GncUD76WX4rJeOWKho"
jwt_authentication = JWTAuthentication(secret=SECRET, lifetime_seconds=3600)

fastapi_users = FastAPIUsers(
    user_db,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)