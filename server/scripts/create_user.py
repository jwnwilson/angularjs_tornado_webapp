import argparse
import logging
import os
import sys
import tornado

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from db.client import create_user  # pylint: disable=wrong-import-position

parser = argparse.ArgumentParser()
parser.add_argument(
    "username", help="Username", type=str)
parser.add_argument(
    "password", help="Password", type=str)
args = parser.parse_args()


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)

    user = args.username
    passw = args.password
    io_loop = tornado.ioloop.IOLoop.current()
    io_loop.run_sync(lambda: create_user(user, passw))
