import json
import logging

from bson.objectid import ObjectId
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
    def delete(self):
        blog_id = self.get_argument('id')

        future = self.db.blog.delete_one(
            {'_id': ObjectId(blog_id)})

        result = yield future
        if result.raw_result.get('n') == 1:
            self.write(json.dumps({'success': True}))
        else:
            self.write(json.dumps({'success': False}))

    @gen.coroutine
    @tornado.web.authenticated
    def post(self):
        blog_data = tornado.escape.json_decode(self.request.body)
        blog_data.pop('$$hashKey')
        blog_id = blog_data.pop('id')
        update = False

        required_attr = []
        for attr in required_attr:
            assert attr in blog_data and blog_data[attr], (
                'Missing attr {}'.format(attr))

        if blog_id:
            future = self.db.blog.find_one(
                {'_id': ObjectId(blog_id)})
            post = yield future
            if post:
                update = True

        if update:
            future = self.db.blog.update_one(
                {'_id': ObjectId(blog_id)},
                {'$set': blog_data})
        else:
            future = self.db.blog.insert_one(blog_data)

        result = yield future
        self.write(json.dumps(blog_data))
