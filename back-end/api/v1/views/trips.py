#!/usr/bin/python3
"""
Defines the requests for trip requests
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.trip import Trip
from models.user import User
from datetime import datetime


@app_views.route('/trips/', methods=['GET'], strict_slashes=False,
                 defaults={'trip_id': None})
@app_views.route('/trips/<trip_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_trip(current_user, trip_id):
    """
    retrievs requested data for the trip
    """
    all_trips = [
        trip.to_dict() for trip in storage.all(Trip).values()
    ]
    if not trip_id:
        return (jsonify(all_trips))

    else:
        for trip in all_trips:
            if trip['id'] == trip_id:
                return (jsonify(trip))

        return (jsonify({"Error": "Trip not found"}))


@app_views.route('/trips/', methods=['POST'], strict_slashes=False)
@token_required
def create_trip(current_user):
    """
    creates a new trip
    """
    props = request.get_json()

    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)
    if not props.get("client_id"):
        abort(jsonify(message="Missing Client ID"), 400)
    if not props.get("driver_id"):
        abort(jsonify(message="Missing Driver ID"), 400)
    if not props.get("vehicle_id"):
        abort(jsonify(message="Missing Vehicle ID"), 400)
    if not props.get("origin"):
        abort(jsonify(message="Missing Origin"), 400)
    if not props.get("destination"):
        abort(jsonify(message="Missing destination"), 400)
    if props.get("status") and props.get("status")\
    not in ['pending', 'ongoing','finished','cancelled']:
        abort(jsonify(message="Invalid trip status"), 400)

    try:
        new_trip = Trip(client_id=props.get("client_id"),
                        driver_id=props.get("driver_id"),
                        vehicle_id=props.get("vehicle_id"),
                        origin=str(props.get("origin")),
                        destination=str(props.get("destination")),
                        status=props.get("status"))
    except Exception:
        abort(jsonify(message="Invalid Location information!"), 400)

    new_trip.save()

    return jsonify({"message":"Trip requested successfully!"}), 200


@app_views.route('/trips/<trip_id>', methods=['PUT'], strict_slashes=False)
@token_required
def update_trip(current_user, trip_id):
    """
    updates details of the trip
    """
    trip = storage.get(Trip, trip_id)
    if trip is None:
        abort(jsonify(message="Not Found"), 404)

    props = request.get_json()
    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)
    for key, value in props.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(trip, key, value)

    if props.get("status") == "ongoing":
        trip.start_at = datetime.now()
    if props.get("status") == "finished" or props.get("status") == "cancelled":
        trip.end_at = datetime.now()

    trip.updated_at = datetime.now()
    storage.save()
    return jsonify({"message": "Trip Updated successfully!"}), 200


@app_views.route('/trips/<trip_id>', methods=['DELETE'], strict_slashes=False)
@token_required
def delete_trip(current_user, trip_id):
    """
    deletes a trip from the database
    """
    trip = storage.get(Trip, trip_id)
    if trip is None:
        abort(jsonify(message="Not Found"), 404)

    trip.delete()
    storage.save()
    return jsonify({})


@app_views.route('/drivers/<driver_id>/trips/', methods=['GET'], strict_slashes=False)
@token_required
def get_driver_trips(current_user, driver_id):
    """
    retrieves all trips for a driver
    """
    driver = storage.get(User, driver_id)
    all_trips = storage.all(Trip).values()
    trips = []

    if driver is None:
        abort(jsonify(message="Driver Not Found"), 404)

    for trip in all_trips:
        if trip.driver_id == driver_id:
            trips.append(trip.to_dict())
    return jsonify(trips), 200


@app_views.route('/users/<user_id>/trips/', methods=['GET'], strict_slashes=False)
@token_required
def get_user_trips(current_user, user_id):
    """
    retrieves all trips for a user
    type1: trips requested as a client
    type2: trips requested as a driver
    """
    user = storage.get(User, user_id)
    all_trips = storage.all(Trip).values()
    trips = []

    if user is None:
        abort(jsonify(message="User Not Found"), 404)

    for trip in all_trips:
        if trip.client_id == user_id:
            trip.type = "type1"
            trips.append(trip.to_dict())
        if trip.driver_id == user_id:
            trip.type = "type2"
            trips.append(trip.to_dict())
    return jsonify(trips), 200