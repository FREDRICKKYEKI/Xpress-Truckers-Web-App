#!/usr/bin/python3
"""
the default file for the default route
"""
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.driver_service import DriverService
from models.image import Image
from models.service import Service
from models.trip import Trip
from models.user import User
from models.vehicle import Vehicle

classes = {"DriverService": DriverService, "Image": Image,
           "Service": Service, "Trip": Trip, 'User': User,
           'Vehicle': Vehicle}


@app_views.route('/status', strict_slashes=False)
def status():
    """
    returns status of app if working
    """
    return (jsonify({"status": "OK"}))

@app_views.route('/stats', strict_slashes=False)
def count():
    """
    provides statistics for the items available in the database
    """
    values = classes.values()
    keys = classes.keys()

    out = {}
    for key, value in zip(keys, values):
        count = storage.count(value)
        out[key] = count

    return (jsonify(out))
