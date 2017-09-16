import os

import motor


def db_client():
    return motor.motor_tornado.MotorClient("mongodb://db:27017").nw_db