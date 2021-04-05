from api import db
from flask_login import UserMixin
from flask_serialize import FlaskSerializeMixin


class User(UserMixin, FlaskSerializeMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
