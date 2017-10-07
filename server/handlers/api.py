import json
import logging

import tornado.web
from tornado import gen
from db.client import sanitise_data
from handlers.base import BaseHandler

logger = logging.getLogger(__name__)


class ProjectApi(BaseHandler):
    @gen.coroutine
    def get(self):
        future = self.db.projects.find().to_list(length=None)
        projects = yield future
        projects = sanitise_data(projects)
        self.write(json.dumps(projects))
