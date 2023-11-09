#!/usr/bin/python3
"""
Defines requests for the drivers route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.driver_service import DriverService


@app_views.route('/driver_service/', methods=['GET'], strict_slashes=False,
                 defaults={'driver_id': None})
@app_views.route('/driver_service/<driver_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_drivers(current_user, driver_id):
    """
    retrievs driver data only
    """
    all_driver_service = storage.all(DriverService).values()
    services = []

    if not driver_id:
        for driver_service in all_driver_service:
            services.append(driver_service.to_dict())

        return jsonify(services)
    else:
        for driver_service in all_driver_service:
            if driver_service.driver_id == driver_id:
                services.append(driver_service.to_dict())

            return jsonify(services)
    return (jsonify({"Error": "Service not found"}))
