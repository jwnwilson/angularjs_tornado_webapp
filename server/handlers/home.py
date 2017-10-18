import json
import logging

import tornado
from tornado.web import asynchronous

from db.client import sanitise_data
from handlers.base import BaseHandler

logger = logging.getLogger(__name__)


class HomeHandler(BaseHandler):
    @asynchronous
    def get(self):
        future = self.db.pages.find_one({'page': 'home'}, callback=self._got_page_text)

    def _got_page_text(self, page_data, error):
        context = {}
        if error:
            raise tornado.web.HTTPError(500, error)
        elif page_data:
            context = sanitise_data(page_data)
        self.render('index.html', context=json.dumps(context))
