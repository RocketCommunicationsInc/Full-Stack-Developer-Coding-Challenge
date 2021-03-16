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

def on_after_register(user: UserDB, request: Request):
    print(f"User {user.id} has registered.")


def on_after_forgot_password(user: UserDB, token: str, request: Request):
    print(f"User {user.id} has forgot their password. Reset token: {token}")


def after_verification_request(user: UserDB, token: str, request: Request):
    print(f"Verification requested for user {user.id}. Verification token: {token}")

#set up routes for user CRUD and Auth
app.include_router(
    fastapi_users.get_auth_router(jwt_authentication), prefix="/auth", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(on_after_register), prefix="/auth", tags=["auth"]
)
app.include_router(
    fastapi_users.get_reset_password_router(
        SECRET, after_forgot_password=on_after_forgot_password
    ),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(
        SECRET, after_verification_request=after_verification_request
    ),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(fastapi_users.get_users_router(), prefix="/users", tags=["users"])


@app.get("/", tags=["root"])
def read_root() -> dict:
    return { "message": "GRM Dashboard" }

#reset sample data
@app.get("/loadtestdata")
def resetData(db: Session = Depends(get_db)):
    
    message = ""

    #reset alerts table and reset with test data
    db.execute("DELETE FROM alerts")
    alertData = json.loads(open('./data/alerts.json').read())
    statement1 = text("""INSERT INTO alerts (errorId, errorSeverity, errorCategory, errorMessage, longMessage, errorTime, selected, new, expanded) VALUES(:errorId, :errorSeverity, :errorCategory, :errorMessage, :longMessage, :errorTime, :selected, :new, :expanded)""")
    for line1 in alertData:
        db.execute(statement1, line1)

    #reset contacts table and reset with test data
    db.execute("DELETE FROM contacts")
    contactData = json.loads(open('./data/contacts.json').read())
    statement2 = text("""INSERT INTO contacts (_id, contactId, contactStatus, contactName, contactGround, contactSatellite, contactEquipment, contactState, contactStep, contactDetail, contactBeginTimestamp, contactEndTimestamp, contactLatitude, contactLongitude, contactAzimuth, contactElevation, contactResolution, contactResolutionStatus) VALUES (:_id, :contactId, :contactStatus, :contactName, :contactGround, :contactSatellite, :contactEquipment, :contactState, :contactStep, :contactDetail, :contactBeginTimestamp, :contactEndTimestamp, :contactLatitude, :contactLongitude, :contactAzimuth, :contactElevation, :contactResolution, :contactResolutionStatus)""")
    for line2 in contactData:
        db.execute(statement2, line2)

    try:
        db.commit()
        message = "Data reset SUCCESSFUL"
    except:
        message = "Data reset FAILED"

    return message

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
