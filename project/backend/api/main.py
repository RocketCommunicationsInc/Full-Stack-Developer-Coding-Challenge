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

@app.get("/contacts/states/count")
def read_contact_status():
    results = []
    rows = session.query(ContactState).all()
    for row in rows:
        contacts = session.query(Contact).filter(Contact.state_id == row.id).all()
        results.append({
            "state_id": row.id,
            "state": row.state.title(),
            "count": len(contacts)
        })

    return results
    