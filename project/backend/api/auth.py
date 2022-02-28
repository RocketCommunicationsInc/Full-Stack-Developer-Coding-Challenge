import random
import string
import jwt
import datetime
from datetime import timezone
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# TODO: Move secret to shared Config for production.
SECRET = '996D0B3EF9B296A03B1C16B5E9E3CE787CE9C29A19194DDF7B7FF26F49080410'
ALGORITHM = 'HS256'

def create_salt(count):
    """
    Create a password salt of a specified length.

    :param count: The character length of the salt string.
    :return: Returns the new salt string.
    """
    ran = ''.join(random.choices(string.ascii_letters + string.digits, k = count))    
    return str(ran)


def get_password_hash(password):
    """
    Hash a clear text password.
   
    :param password: The clear text password to be hashed.
    :return: Returns the hashed copy of the provided password.
    """
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    """
    Verify that a clear password matched a hashed password.

    :param plain_password: the plain text password to be compared.
    :param hashed_password: the hashed verison of the password to be compared.
    :return: returns true if the password matches the hashed verison, else false.
    """
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data, expires=30):
    """
    Creates a JWT token with the embeded data, and expiration.
    
    :param data: the data to be encoded into the token.
    :param expires: the number of minutes the token is valid.
    :return: returns the created token.
    """
    payload = {
        "exp": datetime.datetime.now(tz=timezone.utc) + datetime.timedelta(minutes=expires),
        "data": data
        }
    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)
    return token
    
def verify_token(token):
    """
    Verify that the provided token is valid and has not expired.
    
    :param token: the token to be decoded.
    :return: returns true if the token is still valid, else false.
    """
    try:
        payload = jwt.decode(token, SECRET, algorithm=ALGORITHM)
        return True, payload
    except jwt.ExpiredSignatureError:
        return False, None
    except Exception:
        return False, None
