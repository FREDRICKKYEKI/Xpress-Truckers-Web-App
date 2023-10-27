#!/usr/bin/python3
"""
Defines the requests for trip requests
"""
from api.v1.views import app_views
from flask import jsonify
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
