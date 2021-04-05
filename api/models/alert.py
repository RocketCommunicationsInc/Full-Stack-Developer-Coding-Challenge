from __init__ import db
from flask_serialize import FlaskSerializeMixin


class Alert(FlaskSerializeMixin, db.Model):
    __tablename__ = 'alert'
    id = db.Column(db.Integer, primary_key=True)
    errorId = db.Column(db.String(200), unique=True)
    errorSeverity = db.Column(db.String(200))
    errorCategory = db.Column(db.String(200))
    errorMessage = db.Column(db.String(200))
    longMessage = db.Column(db.Text())
    errorTime = db.Column(db.BigInteger)
    selected = db.Column(db.Boolean)
    new = db.Column(db.Boolean)
    expanded = db.Column(db.Boolean)

    def __init__(self, errorId, errorSeverity, errorCategory, longMessage, errorTime, selected, new, expanded):
        self.errorId = errorId
        self.errorSeverity = errorSeverity
        self.errorCategory = errorCategory
        self.errorMessage = errorMessage
        self.longMessage = longMessage
        self.errorTime = errorTime
        self.selected = selected
        self.new = new
        self.expanded = expanded
