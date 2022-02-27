from passlib.context import CryptContext
import random
import string
import jwt
import datetime
from datetime import timezone

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = '996D0B3EF9B296A03B1C16B5E9E3CE787CE9C29A19194DDF7B7FF26F49080410'
ALGORITHM = 'HS256'

def create_salt(count):
    ran = ''.join(random.choices(string.ascii_letters + string.digits, k = count))    
    return str(ran)


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data):
    payload = {
        "exp": datetime.datetime.now(tz=timezone.utc) + datetime.timedelta(minutes=30),
        "data": data
        }
    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)
    return token
    
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET, algorithm=ALGORITHM)
        return True, payload
    except jwt.ExpiredSignatureError:
        return False, None
    except Exception:
        return False, None
