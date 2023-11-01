#!/usr/bin/python3
"""
Returns the status of our application
"""
from api.v1.views import app_views
from flask import Flask, jsonify
from flask_cors import CORS
from models import storage
from os import getenv

app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app)


@app.teardown_appcontext
def teardown(self):
    """
    close the database after fetching
    """
    storage.close()

@app.errorhandler(404)
def page_not_found(error):
    """
    if the route is not found return an error
    """
    return (jsonify({"error": "Not found"}), 404)

if __name__ == "__main__":
    host = getenv('XT_API_HOST') if getenv('XT_API_HOST') else '0.0.0.0'
    port = getenv('XT_API_PORT') if getenv('XT_API_PORT') else '5000'

    app.run(host=host, port=port, threaded=True, debug=True)
