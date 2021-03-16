import models
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from pydantic import BaseModel 
from models import Alert, Contact, fastapi_users, jwt_authentication, UserDB, SECRET
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
import simplejson as json

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

models.Base.metadata.create_all(bind=engine)

class AlertRequest(BaseModel):
    errorId: str

class ContactRequest(BaseModel):
    contactId: str

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()



@app.get("/", tags=["root"])
def read_root() -> dict:
    return { "message": "GRM Dashboard" }


#get all alerts
@app.get("/alerts")
def alerts(db: Session = Depends(get_db)):
    
    alerts = db.query(Alert)

    alerts = alerts.all()

    return {
        "data": alerts
    }

#get all contacts
@app.get("/contacts")
def contacts(db: Session = Depends(get_db)):

    contacts = db.query(Contact)

    contacts = contacts.all()

    return {
        "data": contacts
    }
