import json
import logging

from bson.objectid import ObjectId
import pymongo
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
        for p in projects:
            self.create_markdown(p, 'markdown', 'text')
        self.write(json.dumps(projects))


class HobbiesApi(BaseHandler):
    @gen.coroutine
    def get(self):
        future = self.db.hobbies.find().to_list(length=None)
        hobbies = yield future
        hobbies = sanitise_data(hobbies)
        for h in hobbies:
            self.create_markdown(h, 'markdown', 'text')
        self.write(json.dumps(hobbies))


class BlogApi(BaseHandler):
    @classmethod
    def clean_post(cls, data):
        if '$$hashKey' in data:
            data.pop('$$hashKey')

        for attr in cls.required_attr:
            assert attr in blog_data and blog_data[attr], (
                'Missing attr {}'.format(attr))

    @gen.coroutine
    def get(self):
        future = self.db.blog.find().sort(
            'created', pymongo.DESCENDING).to_list(length=None)
        blogs = yield future
        blogs = sanitise_data(blogs)
        for b in blogs:
            self.create_markdown(b, 'markdown', 'body')
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
        blog_data = clean_post(
            tornado.escape.json_decode(self.request.body))
        blog_id = blog_data.pop('id') if blog_data.get('id') else None
        update = False

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

        blog_data = sanitise_data(blog_data)
        self.write(json.dumps(blog_data))
