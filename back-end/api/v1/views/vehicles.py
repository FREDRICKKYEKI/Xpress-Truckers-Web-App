#!/usr/bin/python3
"""
Defines the routes for vehicles route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.vehicle import Vehicle
from models.driver_service import DriverService
from models.service import Service


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
        abort(jsonify(message="Not a JSON"), 400)
    if not props.get("driver_id"):
        abort(jsonify(message="Missing Driver ID"), 400)
    if not props.get("make"):
        abort(jsonify(message="Missing Make"), 400)
    if not props.get("vehicle_type"):
        abort(jsonify(message="Missing Vehicle Type"), 400)
    if not props.get("vehicle_registration"):
        abort(jsonify(message="Missing Vehicle Registration"), 400)
    if not props.get("location"):
        abort(jsonify(message="Missing Location"), 400)

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
        abort(jsonify(message="Vehicle Not Found"), 404)

    props = request.get_json()
    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)
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
        abort(jsonify(message="Vehicle not found"), 404)

    vehicle.delete()
    storage.save()
    return jsonify({})

"""
@app_views.route('/filter_vehicles/', methods=['POST'],
                 strict_slashes=False)
@token_required
def filter_truck(current_user):

    props = request.get_json()

    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)

    vehicle_types = props.get("vehicle_type")

    if not vehicle_types:
        abort(jsonify(message="Please Provide a vehicle type"), 400)
    if type(vehicle_types) != list:
        abort(jsonify(message="Vehicle type should be provided as a list"), 400)

    filtered = []
    all_vehicles = storage.all(Vehicle).values()
    for vehicle in all_vehicles:
        if vehicle.vehicle_type in vehicle_types:
            filtered.append(vehicle.to_dict())

    if filtered == []:
        return jsonify({"Message": "No Vehicles Found"})

    return jsonify(filtered)
"""


@app_views.route('/filter_services/', methods=['POST'],
                 strict_slashes=False)
@token_required
def filter_service(current_user):
    """
    filters trucks by service offered
    """
    props = request.get_json()

    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)

    service_types = props.get("service_type")

    if not service_types:
        abort(jsonify(message="Please provide a service"), 400)

    if type(service_types) != list:
        abort(jsonify(message="services should be provided as a list"), 400)

    vehicle_types = props.get("vehicle_type")

    if not vehicle_types:
        abort(jsonify(message="Please Provide a vehicle type"), 400)

    if type(vehicle_types) != list:
        abort(jsonify(message="Vehicle type should be provided as a list"), 400)

    service_ids = []
    driver_ids = {}
    filtered = []

    # I'm sure there is a better way
    # get the service ids
    services = storage.all(Service).values()
    for service in services:
        if service.type in service_types:
            service_ids.append(service.id)
    if service_ids == []:
        return jsonify({"Message": "Invalid service type provided"})

    # get drivers with same service ids
    driver_services = storage.all(DriverService).values()
    for item in driver_services:
        if item.service_id in service_ids:
            if item.driver_id not in driver_ids:
                temp = []
                for service in services:
                    if service.id == item.service_id:
                        temp.append(service.to_dict())
                        break
                driver_ids[item.driver_id] = temp
            else:
                temp = driver_ids[item.driver_id]
                for service in services:
                    if service.id == item.service_id:
                        temp.append(service.to_dict())
                        break
                driver_ids[item.driver_id] = temp

    if driver_ids == []:
        return jsonify({"Message": "No drivers found"})

    all_vehicles = storage.all(Vehicle).values()
    for vehicle in all_vehicles:
        keys = driver_ids.keys()
        if vehicle.driver_id in keys and vehicle.vehicle_type in vehicle_types:
            temp = vehicle.to_dict()
            temp["services"] = driver_ids[vehicle.driver_id]
            filtered.append(temp)

    if filtered == []:
        return jsonify({"Message": "No drivers found"})

    return jsonify(filtered)
