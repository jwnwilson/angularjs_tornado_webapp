import tornado.web


class NotFoundHandler(tornado.web.RequestHandler):
    def prepare(self):  # for all method
        self.render('404.html', page=None, context={})
