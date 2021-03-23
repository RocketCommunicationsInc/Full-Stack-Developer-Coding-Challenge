from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    password = db.Column(db.String(128))

    def __repr__(self):
        return self.__dict__


class Alerts(db.Model):

    __tablename__ = 'alerts'

    id = db.Column(db.Integer, primary_key=True)
    errorId = db.Column(db.String(128))
    errorSeverity = db.Column(db.String(28))
    errorCategory = db.Column(db.String(28))
    errorMessage = db.Column(db.String(128))
    longMessage = db.Column(db.String(500))
    errorTime = db.Column(db.BigInteger)
    selected = db.Column(db.Boolean())
    new = db.Column(db.Boolean())
    expanded = db.Column(db.Boolean())

    def __repr__(self):
        return self.__dict__


class Contacts(db.Model):

    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    _id = db.Column(db.String(250))
    contactId = db.Column(db.String(128))
    contactStatus = db.Column(db.String(28))
    contactName = db.Column(db.Integer)
    contactGround = db.Column(db.String(28))
    contactSatellite = db.Column(db.String(28))
    contactEquipment = db.Column(db.String(128))
    contactState = db.Column(db.String(28))
    contactStep = db.Column(db.String(48))
    contactDetail = db.Column(db.String(500))
    contactBeginTimestamp = db.Column(db.Integer)
    contactEndTimestamp = db.Column(db.Integer)
    contactLatitude = db.Column(db.Integer)
    contactLongitude = db.Column(db.Integer)
    contactAzimuth = db.Column(db.Integer)
    contactElevation = db.Column(db.Integer)
    contactResolution = db.Column(db.String(28))
    contactResolutionStatus = db.Column(db.String(28))

    def __repr__(self):
        return self.__dict__
