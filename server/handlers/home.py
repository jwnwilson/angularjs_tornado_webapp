import json
import logging

import tornado.web

from handlers.base import BaseHandler

logger = logging.getLogger(__name__)


class HomeHandler(BaseHandler):
    @tornado.web.asynchronous
    def get(self):
        self.db.pages.find_one({'page': 'home'}, callback=self._got_page_text)

    def _got_page_text(self, page_data, error):
        context = {}
        if error:
            raise tornado.web.HTTPError(500, error)
        elif page_data:
            context['intro_text'] = page_data['intro_text']
            context['intro_title'] = page_data['intro_title']
        self.render('index.html', context=json.dumps(context))
        self.finish()
