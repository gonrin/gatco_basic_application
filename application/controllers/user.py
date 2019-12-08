from gatco.response import json, text
from application.server import app
from application.database import db
from application.extensions import auth

from application.models.model import User, Role

@app.route("/user_test")
async def user_test(request):
    return text("user_test api")