from handlers.base import BaseHandler

import logging
logger = logging.getLogger(__name__)

class HomeHandler(BaseHandler):
    def get(self):
        self.render("index.html")
