from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import *

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a database engine. 
engine = create_engine('sqlite:///rocket.db')
Base.metadata.bind = engine
 
# Create a new database session.
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.get("/alerts")
def read_alerts():
    rows = session.query(Alert).all()
    return rows

@app.get("/alerts/category")
def read_alert_categories():
    rows = session.query(AlertCategory).all()
    return rows

@app.get("/alerts/severity")
def read_alert_severity():
    rows = session.query(AlertSeverity).all()
    return rows

@app.get("/contacts")
def read_contact():
    rows = session.query(Contact).all()
    return rows

@app.get("/contacts/status")
def read_contact_status():
    rows = session.query(ContactStatus).all()
    return rows

@app.get("/contacts/ground")
def read_contact_ground():
    rows = session.query(ContactGround).all()
    return rows

@app.get("/contacts/state")
def read_contact_state():
    rows = session.query(ContactState).all()
    return rows

@app.get("/contacts/step")
def read_contact_step():
    rows = session.query(ContactStep).all()
    return rows

@app.get("/contacts/resolution")
def read_contact_resolution():
    rows = session.query(ContactResolution).all()
    return rows

@app.get("/contacts/resolution/status")
def read_contact_resolution_status():
    rows = session.query(ContactResolutionStatus).all()
    return rows

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

