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


class HobbiesApi(BaseHandler):
    @gen.coroutine
    def get(self):
        future = self.db.hobbies.find().to_list(length=None)
        hobbies = yield future
        hobbies = sanitise_data(hobbies)
        self.write(json.dumps(hobbies))


class BlogApi(BaseHandler):
    @gen.coroutine
    def get(self):
        future = self.db.blog.find().to_list(length=None)
        blogs = yield future
        blogs = sanitise_data(blogs)
        self.write(json.dumps(blogs))

    @gen.coroutine
    @tornado.web.authenticated
    def post(self):
        blog_data = tornado.escape.json_decode(self.request.body)

        required_attr = []
        for attr in required_attr:
            assert attr in blog_data and blog_data[attr], (
                'Missing attr {}'.format(attr))

        future = self.db.blog.insert_one(blog_data)
        result = yield future
