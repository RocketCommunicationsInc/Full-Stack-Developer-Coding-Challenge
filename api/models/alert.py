from . import db


class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    errorId = db.Column(db.String(200), unique=True)
    errorSeverity = db.Column(db.String(200))
    errorCategory = db.Column(db.String(200))
    errorMessage = db.Column(db.String(200))
    longMessage = db.Column(db.Text())
    errorTime = db.Column(db.Integer)
    selected = db.Column(db.Boolean)
    new = db.Column(db.Boolean)
    expanded = db.Column(db.Boolean)
