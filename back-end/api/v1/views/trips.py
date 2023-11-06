#!/usr/bin/python3
"""
Defines the requests for trip requests
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.trip import Trip


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
    all_trips = storage.all(Trip)

    props = request.get_json()
    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)
    if not props.get("client_id"):
        abort(jsonify(message="Missing Client ID"), 400)
    if not props.get("driver_id"):
        abort(jsonify(message="Missing Driver ID"), 400)
    if not props.get("service_id"):
        abort(jsonify(message="Missing Service ID"), 400)
    if not props.get("vehicle_id"):
        abort(jsonify(message="Missing Vehicle ID"), 400)
    if not props.get("origin"):
        abort(jsonify(message="Missing Origin"), 400)
    if not props.get("destination"):
        abort(jsonify(message="Missing destination"), 400)
    if not props.get("status"):
        abort(jsonify(message="Missing status"), 400)

    new_trip = Trip(**props)
    new_trip.save()
    return jsonify(new_trip.to_dict()), 201


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

    storage.save()
    return jsonify(trip.to_dict()), 200


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
