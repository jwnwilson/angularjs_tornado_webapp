import json
import logging

import tornado

from db.client import sanitise_data
from handlers.base import BaseHandler

logger = logging.getLogger(__name__)


class HomeHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        user = self.get_current_user()
        future = self.db.pages.find_one({'page': 'home'})
        page_data = yield future
        page_data['xsrf'] = self.xsrf_token.decode('utf-8')
        context = {}
        if not page_data:
            raise tornado.web.HTTPError(500, 'No page data available.')
        elif page_data:
            context = sanitise_data(page_data)
        if user:
            context['user'] = str(user, 'utf-8')
        self.render('index.html', context=json.dumps(context))
