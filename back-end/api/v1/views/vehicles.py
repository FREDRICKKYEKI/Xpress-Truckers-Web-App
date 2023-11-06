#!/usr/bin/python3
"""
Defines the routes for vehicles route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.vehicle import Vehicle


@app_views.route('/vehicles/', methods=['GET'], strict_slashes=False,
                 defaults={'vehicle_id': None})
@app_views.route('/vehicles/<vehicle_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_vehicle(current_user, vehicle_id):
    """
    retrievs vehicle data only
    """
    if not vehicle_id:
        all_vehicles = [
            vehicle.to_dict() for vehicle in storage.all(Vehicle).values()
        ]
        return (jsonify(all_vehicles))

    else:
        vehicle = storage.get(Vehicle, vehicle_id)
        if vehicle:
            return (jsonify(vehicle.to_dict()))

        return (jsonify({"Error": "Vehicle not found"}))


@app_views.route('/vehicles/', methods=['POST'], strict_slashes=False)
@token_required
def insert_vehicle(current_user):
    """
    creates a new vehicle object
    """
    all_vehicles = storage.all(Vehicle)

    props = request.get_json()
    if type(props) != dict:
        abort(400, message="Not a JSON")
    if not props.get("driver_id"):
        abort(400, message="Missing Driver ID")
    if not props.get("make"):
        abort(400, message="Missing Make")
    if not props.get("vehicle_type"):
        abort(400, message="Missing Vehicle Type")
    if not props.get("vehicle_registration"):
        abort(400, message="Missing Vehicle Registration")
    if not props.get("location"):
        abort(400, message="Missing Location")

    new_vehicle = Vehicle(**props)
    new_vehicle.save()
    return jsonify(new_vehicle.to_dict()), 201


@app_views.route('/vehicles/<vehicle_id>', methods=['PUT'],
                 strict_slashes=False)
@token_required
def update_vehicle(current_user, vehicle_id):
    """
    update a Vehicle object
    """
    vehicle = storage.get(Vehicle, vehicle_id)
    if vehicle is None:
        abort(404, message="Not Found")

    props = request.get_json()
    if type(props) != dict:
        abort(400, message="Not a JSON")
    for key, value in props.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(vehicle, key, value)

    storage.save()
    return jsonify(vehicle.to_dict()), 200


@app_views.route('/vehicles/<vehicle_id>', methods=['DELETE'],
                 strict_slashes=False)
@token_required
def delete_vehicle(current_user, vehicle_id):
    """
    delete a vehicle object
    """
    vehicle = storage.get(Vehicle, vehicle_id)
    if vehicle is None:
        abort(404, message="Message")

    vehicle.delete()
    storage.save()
    return jsonify({})
