from conf.settings import API_prefix
from handlers.home import HomeHandler
from handlers.api import ProjectApi

# View Handlers
url_patterns = [
    (r"/", HomeHandler),
]

# API Handlers
url_patterns += [
    (API_prefix + 'projects', ProjectApi),
]
