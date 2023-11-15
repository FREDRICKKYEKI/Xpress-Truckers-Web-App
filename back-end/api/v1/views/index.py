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

@app_views.route('/', strict_slashes=False)
def available():
    """shows all available routes"""
    public = ['/services/', '/services/<service_id>/']

    auth_get = ['/driver_service/', '/driver_service/<driver_id>/', '/drivers/',
                '/drivers/<driver_id>', '/images/', '/images/<owner_id>/',
                '/trips/', '/trips/<trip_id>/', '/users/', '/users/<user_id>/',
                '/clients/', '/clients/<client_id>/', '/vehicles/', '/vehicles/<vehicle_id>/']
    auth_post = ['/images/', '/post_img/', '/trips/', '/users/', '/vehicles/', '/filter_vehicles/']
    auth_put = ['/images/<owner_id>', '/trips/<trip_id>', '/users/<user_id>', '/vehicles/<vehicle_id>']
    auth_delete = ['/images/<image_id>/', '/trips/<trip_id>', '/users/<user_id>',
                   '/vehicles/<vehicle_id>']

    out = {"public_routes": public,
           "auth_required": {"auth_post": auth_post, "auth_get": auth_get,
                             "auth_put": auth_put, "auth_delete": auth_delete
                             }
           }

    return (jsonify(out))

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
