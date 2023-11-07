#!/usr/bin/python3
"""
Defines the routes for vehicles route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.service import Service


@app_views.route('/services/', methods=['GET'], strict_slashes=False,
                 defaults={'service_id': None})
@app_views.route('/services/<service_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_service(_, service_id):
    """
    retrievs vehicle data only
    """
    all_services = [
        service.to_dict() for service in storage.all(Service).values()
    ]
    if not service_id:
        return (jsonify(all_services))

    else:
        for service in all_services:
            if service['id'] == service_id:
                return (jsonify(service))

        return (jsonify({"Error": "Service not found"}))
