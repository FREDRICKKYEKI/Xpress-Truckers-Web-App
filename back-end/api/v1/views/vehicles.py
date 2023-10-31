#!/usr/bin/python3
"""
Defines the routes for vehicles route
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
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


@app_views.route('/vehicles/', methods=['POST'], strict_slashes=False)
def insert_vehicle():
    """
    creates a new vehicle object
    """
    all_vehicles = storage.all(Vehicle)

    props = request.get_json()
    if type(props) != dict:
        abort(400, description="Not a JSON")
    if not props.get("driver_id"):
        abort(400, description="Missing Driver ID")
    if not props.get("make"):
        abort(400, description="Missing Make")
    if not props.get("vehicle_type"):
        abort(400, description="Missing Vehicle Type")
    if not props.get("vehicle_registration"):
        abort(400, description="Missing Vehicle Registration")
    if not props.get("location"):
        abort(400, description="Missing Location")

    new_vehicle = Vehicle(**props)
    new_vehicle.save()
    return jsonify(new_vehicle.to_dict()), 201


@app_views.route('/vehicles/<vehicle_id>', methods=['PUT'],
                 strict_slashes=False)
def update_vehicle(vehicle_id):
    """
    update a Vehicle object
    """
    vehicle = storage.get(Vehicle, vehicle_id)
    if vehicle is None:
        abort(404)

    props = request.get_json()
    if type(props) != dict:
        abort(400, description="Not a JSON")
    for key, value in props.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(vehicle, key, value)

    storage.save()
    return jsonify(vehicle.to_dict()), 200


@app_views.route('/vehicles/<vehicle_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_vehicle(vehicle_id):
    """
    delete a vehicle object
    """
    vehicle = storage.get(Vehicle, vehicle_id)
    if vehicle is None:
        abort(404)

    vehicle.delete()
    storage.save()
    return jsonify({})
