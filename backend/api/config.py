import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(dirname(__file__)), '.env')
from datetime import timedelta

load_dotenv(dotenv_path)

class BaseConfig():
  SQLALCHEMY_DATABASE_URI = os.environ.get("MYSQL_URI")
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SECRET_KEY = os.environ.get("SECRET_KEY")
  JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
  JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
  JWT_TOKEN_LOCATION=["cookies"]
  JWT_COOKIE_DOMAIN="127.0.0.1"
  # SESSION_COOKIE_HTTPONLY = True
  # REMEMBER_COOKIE_HTTPONLY = True
  SESSION_COOKIE_SECURE = False
  # REMEMBER_COOKIE_SECURE = True
