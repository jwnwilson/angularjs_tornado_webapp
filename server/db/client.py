from copy import deepcopy
import logging
import os

import motor
import tornado

from utils import hash_password

logger = logging.getLogger(__name__)


def db_client():
    """
    Create a client connecting to our mongo db
    """
    db_uri = os.getenv('DB_URI')
    return motor.motor_tornado.MotorClient(db_uri).nw_db


def sanitise_data(data):
    """
    Remove non serialisable / values we want don't want to render
    """
    def sanitise_dict(data_dict):
        clean_dict = deepcopy(data_dict)
        if '_id' in clean_dict:
            del clean_dict['_id']
            clean_dict['id'] = str(data_dict['_id'])
        return clean_dict

    ret_data = None
    if isinstance(data, list):
        ret_data = []
        for x in data:
            ret_data.append(sanitise_dict(x))
    elif isinstance(data, dict):
        ret_data = sanitise_dict(data)
    return ret_data


@tornado.gen.coroutine
def create_user(username, password):
    db = db_client()
    hashed_pass, salt = hash_password(password)
    future = db.users.update_one(
        {'username': username},
        {'$set':
            {
                'username': username,
                'password_hash': hashed_pass,
                'salt': salt
            }
        },
        upsert=True
    )
    user = yield future
    logger.info('Created / Updated user: %s', username)
    return user
