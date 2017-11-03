import hashlib
import uuid


def hash_password(password, salt=None):
    if not salt:
        salt = uuid.uuid4().hex
    hashed_password = hashlib.sha512(
        password.encode('utf-8') +
        salt.encode('utf-8')).hexdigest()
    return hashed_password, salt
