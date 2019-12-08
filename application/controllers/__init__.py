# Register Blueprints/Views.
from application.extensions import jinja

def init_views(app):
    pass

    @app.route('/')
    def index(request):
        return jinja.render('index.html', request)
    
    