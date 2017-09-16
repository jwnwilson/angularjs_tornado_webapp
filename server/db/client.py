import motor


def db_client():
    return motor.motor_tornado.MotorClient().nw_db