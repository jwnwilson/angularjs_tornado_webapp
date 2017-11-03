import logging

import tornado

from .base import BaseHandler
from utils import hash_password

logger = logging.getLogger(__name__)


class LoginHandler(BaseHandler):
    def check_password(self, user, password):
        password_hash, _ = hash_password(password, user['salt'])
        if password_hash == user['password_hash']:
            return True
        return False

    @tornado.gen.coroutine
    def get(self):
        incorrect = self.get_secure_cookie('incorrect')
        if incorrect and int(incorrect) > 20:
            self.write('<center>blocked</center>')
            return
        self.render('login.html', context={})

    @tornado.gen.coroutine
    def post(self):
        incorrect = self.get_secure_cookie('incorrect')
        if incorrect and int(incorrect) > 20:
            self.write('<center>blocked</center>')
            return

        username = tornado.escape.xhtml_escape(self.get_argument('username'))
        password = tornado.escape.xhtml_escape(self.get_argument('password'))
        future = self.db.users.find_one({'username': username})
        user = yield future

        if user and self.check_password(user, password):
            self.set_secure_cookie('user', self.get_argument('username'))
            self.set_secure_cookie('incorrect', '0')
            self.redirect(self.reverse_url('index'))
        else:
            incorrect = self.get_secure_cookie('incorrect') or 0
            increased = str(int(incorrect)+1)
            self.set_secure_cookie('incorrect', increased)
            self.write(
                '''<center>
                    Something Wrong With Your Data (%s)<br />
                    <a href='/'>Go Home</a>
                  </center>''' % increased)


class LogoutHandler(BaseHandler):
    def get(self):
        self.clear_cookie('user')
        self.redirect(
            self.get_argument('next', self.reverse_url('index')))
