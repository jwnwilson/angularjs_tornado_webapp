import logging

import tornado.web

from handlers.base import BaseHandler

logger = logging.getLogger(__name__)


class HomeHandler(BaseHandler):
    @tornado.web.asynchronous
    def get(self):
        self.render('index.html')
