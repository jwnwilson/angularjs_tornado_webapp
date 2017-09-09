import logging

from handlers.base import BaseHandler

logger = logging.getLogger(__name__)


class HomeHandler(BaseHandler):
    def get(self):
        self.render("index.html")
