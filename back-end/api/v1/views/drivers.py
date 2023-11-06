#!/usr/bin/python3
"""
Defines requests for the drivers route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.user import User
from models.image import Image


@app_views.route('/drivers/', methods=['GET'], strict_slashes=False,
                 defaults={'driver_id': None})
@app_views.route('/drivers/<driver_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_drivers(current_user, driver_id):
    """
    retrievs driver data only
    """
    all_users = storage.all(User).values()
    images = storage.all(Image).values()
    drivers = []

    for user in all_users:
        if user.role == 'driver':
            temp = user.to_dict()
            url = [{image.role: image.url} for image in images
                       if image.owner_id == user.id]
            temp["img"] = url
            drivers.append(temp)

    if not driver_id:
        return (jsonify(drivers))
    else:
        for driver in drivers:
            if driver['id'] == driver_id:
                return (jsonify(driver))
        return (jsonify({"Error": "Driver not found"}))
