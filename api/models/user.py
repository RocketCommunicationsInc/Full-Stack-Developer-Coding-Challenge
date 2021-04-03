from .. import db
from flask_login import UserMixin


class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(200))

    def __init__(self, id, name, email, password):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
