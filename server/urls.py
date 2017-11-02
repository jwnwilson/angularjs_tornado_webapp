import tornado

from conf.settings import API_prefix
from handlers.api import BlogApi
from handlers.api import ProjectApi
from handlers.auth import LoginHandler
from handlers.auth import LogoutHandler
from handlers.home import HomeHandler


# View Handlers
url_patterns = [
    tornado.web.url(r'/', HomeHandler, name='index'),
    tornado.web.url(r'/login', LoginHandler, name="login"),
    tornado.web.url(r'/logout', LogoutHandler, name="logout")
]

# API Handlers
url_patterns += [
    (API_prefix + 'blogs', BlogApi),
    (API_prefix + 'projects', ProjectApi),
]
