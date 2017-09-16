import logging

import tornado.web

from handlers.base import BaseHandler

logger = logging.getLogger(__name__)


class HomeHandler(BaseHandler):
    @tornado.web.asynchronous
    def get(self):
        self.db.home.find().to_list(1, callback=self._got_text)

    def _got_text(self, text, error):
        if error:
            raise tornado.web.HTTPError(500, error)
        elif text:
            pass
        self.render('index.html')
        self.finish()
