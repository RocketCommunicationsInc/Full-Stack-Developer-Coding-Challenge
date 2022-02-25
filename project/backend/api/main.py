from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
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
engine = create_engine('sqlite:///rocket.db', connect_args={'check_same_thread': False}, poolclass=StaticPool)
Base.metadata.bind = engine
 
# Create a new database session.
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.get("/alerts")
def read_alerts():
    # Get all alerts.
    rows = session.query(Alert).all()
    
    # Prepare return data.
    data = []
    for row in rows:
        data.append(row.to_json())
        
    # Return data.
    return data

@app.get("/contacts")
def read_contact():
    # Get all contacts.
    rows = session.query(Contact).all()
    
    # Prepare return data.
    data = []
    for row in rows:
        data.append(row.to_json())
        
    # Return data.
    return data

@app.get("/contacts/status")
def read_contact_status():
    rows = session.query(ContactStatus).all()
    return rows

@app.get("/contacts/status/{id}")
def read_contacts_by_status(id):
    # Query database for Contact by their status.
    rows = session.query(Contact).filter(Contact.status_id == id)
    
    # Prepare the data for return.
    data = []
    for row in rows:
        data.append(row.to_json())
        
    # Return data.
    return data
    