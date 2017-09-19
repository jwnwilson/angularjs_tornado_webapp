import os
from copy import deepcopy

import motor


def db_client():
    """
    Create a client connecting to our mongo db
    """
    return motor.motor_tornado.MotorClient("mongodb://db:27017").nw_db


def sanitise_data(data):
    """
    Remove non serialisable / values we want don't want to render
    """
    def sanitise_dict(data_dict):
        clean_dict = deepcopy(data_dict)
        del clean_dict['_id']
        return clean_dict

    ret_data = None
    if isinstance(data, list):
        ret_data = []
        for x in data:
            ret_data.append(sanitise_dict(x))
    elif isinstance(data, dict):
        ret_data = sanitise_dict(data)
    return ret_data
