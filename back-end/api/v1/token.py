#!/user/bin/python3
"""
defines a jwt token generation
"""
from api.v1.views import app_views
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import storage
from os import getenv
import jwt

app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"Origins": "http://localhost:5173"}})
app.config['SECRET_KEY'] = 'thisissecret'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing'}), 401

        data = jwt.decode(token, app.config['SECRET_KEY'])
        users = storage.all(User).values()
        current_user = None
        for user in users:
            if user.id == data['id']:
                current_user = user
        if current_user is None:
            return jsonify({'message' : 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated
