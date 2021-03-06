import logging
import os

import tornado
import tornado.template
from tornado.options import define, options

from handlers.error import NotFoundHandler

# Global settings
API_prefix = r'/api/v1/'

# Make filepaths relative to settings.
path = lambda root, *a: os.path.join(root, *a) # pylint: disable=unnecessary-lambda
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(ROOT)

define("port", default=8888, help="run on the given port", type=int)
define("config", default=None, help="tornado config file")
define("debug", default=False, help="debug mode")

if not os.environ.get("TEST"):
    tornado.options.parse_command_line()

MEDIA_ROOT = path(PROJECT_ROOT, 'media')
STATIC_ROOT = path(PROJECT_ROOT, 'static')
TEMPLATE_ROOT = path(ROOT, 'templates')

# Deployment Configuration

class DeploymentType:
    PRODUCTION = "PRODUCTION"
    DEV = "DEV"
    SOLO = "SOLO"
    STAGING = "STAGING"
    dict = {
        SOLO: 1,
        PRODUCTION: 2,
        DEV: 3,
        STAGING: 4
    }

if 'DEPLOYMENT_TYPE' in os.environ:
    DEPLOYMENT = os.environ['DEPLOYMENT_TYPE'].upper()
else:
    DEPLOYMENT = DeploymentType.SOLO

settings = {}
settings['debug'] = DEPLOYMENT != DeploymentType.PRODUCTION or options.debug
settings['static_path'] = STATIC_ROOT
settings['cookie_secret'] = '0140f0c5b27d439c88a0da22626f6333'
settings['xsrf_cookies'] = True
settings['template_loader'] = tornado.template.Loader(TEMPLATE_ROOT)
settings['login_url'] = '/login'
settings['default_handler_class'] = NotFoundHandler

SYSLOG_TAG = "noelwilson"
SYSLOG_FACILITY = logging.handlers.SysLogHandler.LOG_LOCAL2

# See PEP 391 and logconfig for formatting help.  Each section of LOGGERS
# will get merged into the corresponding section of log_settings.py.
# Handlers and log levels are set up automatically based on LOG_LEVEL and DEBUG
# unless you set them here.  Messages will not propagate through a logger
# unless propagate: True is set.
LOGGERS = {
   'loggers': {
        'noelwilson': {},
    },
}

if settings['debug']:
    LOG_LEVEL = logging.DEBUG
else:
    LOG_LEVEL = logging.INFO
USE_SYSLOG = DEPLOYMENT != DeploymentType.SOLO

if options.config:
    tornado.options.parse_config_file(options.config)
