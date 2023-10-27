#!/usr/bin/python3
"""
Defines the routes for vehicles route
"""
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.vehicle import Vehicle


@app_views.route('/vehicles/', methods=['GET'], strict_slashes=False,
                 defaults={'vehicle_id': None})
@app_views.route('/vehicles/<vehicle_id>/', methods=['GET'],
                 strict_slashes=False)
def get_vehicle(vehicle_id):
    """
    retrievs vehicle data only
    """
    all_vehicles = [
        vehicle.to_dict() for vehicle in storage.all(Vehicle).values()
    ]
    if not vehicle_id:
        return (jsonify(all_vehicles))

    else:
        for vehicle in all_vehicles:
            if vehicle['id'] == vehicle_id:
                return (jsonify(vehicle))

        return (jsonify({"Error": "Vehicle not found"}))
