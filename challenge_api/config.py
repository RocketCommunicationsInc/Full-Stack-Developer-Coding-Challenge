import os

class Config(object):
    CWD = os.path.abspath(os.path.dirname(__file__))  # This directory

    DB_ENDPOINT = os.environ.get('DATABASE_URL', '')