#!/usr/bin/python3
"""
Defines the requests for trip requests
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.trip import Trip


@app_views.route('/trips/', methods=['GET'], strict_slashes=False,
                 defaults={'trip_id': None})
@app_views.route('/trips/<trip_id>/', methods=['GET'],
                 strict_slashes=False)
def get_trip(trip_id):
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
def create_trip():
    """
    creates a new trip
    """
    all_trips = storage.all(Trip)

    props = request.get_json()
    if type(props) != dict:
        abort(400, description="Not a JSON")
    if not props.get("client_id"):
        abort(400, description="Missing Client ID")
    if not props.get("driver_id"):
        abort(400, description="Missing Driver ID")
    if not props.get("service_id"):
        abort(400, description="Missing Service ID")
    if not props.get("vehicle_id"):
        abort(400, description="Missing Vehicle ID")
    if not props.get("origin"):
        abort(400, description="Missing Origin")
    if not props.get("destination"):
        abort(400, description="Missing destination")
    if not props.get("status"):
        abort(400, description="Missing status")

    new_trip = Trip(**props)
    new_trip.save()
    return jsonify(new_trip.to_dict()), 201


@app_views.route('/trips/<trip_id>', methods=['PUT'], strict_slashes=False)
def update_trip(trip_id):
    """
    updates details of the trip
    """
    trip = storage.get(Trip, trip_id)
    if trip is None:
        abort(404)

    props = request.get_json()
    if type(props) != dict:
        abort(400, description="Not a JSON")
    for key, value in props.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(trip, key, value)

    storage.save()
    return jsonify(trip.to_dict()), 200


@app_views.route('/trips/<trip_id>', methods=['DELETE'], strict_slashes=False)
def delete_trip(trip_id):
    """
    deletes a trip from the database
    """
    trip = storage.get(Trip, trip_id)
    if trip is None:
        abort(404)

    trip.delete()
    storage.save()
    return jsonify({})
