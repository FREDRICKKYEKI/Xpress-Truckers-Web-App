#!/usr/bin/python3
"""
Defines requests for the drivers route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.user import User
from models.vehicle import Vehicle


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
    all_vehicles = storage.all(Vehicle).values()
    drivers = []

    for user in all_users:
        if user.role == 'driver':
            drivers.append(user.to_dict())

    if not driver_id:
        for vehicle in all_vehicles:
            for driver in drivers:
                if vehicle.driver_id == driver['id']:
                    driver['vehicle'] = vehicle.to_dict()
        return (jsonify(drivers))
    else:
        for driver in drivers:
            if driver['id'] == driver_id:
                return (jsonify(driver))
        return (jsonify({"Error": "Driver not found"}))
