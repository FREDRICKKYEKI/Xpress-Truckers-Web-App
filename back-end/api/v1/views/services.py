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
def get_service(current_user, service_id):
    """
    retrievs vehicle data only
    """
    all_services = [
        service.to_dict() for service in storage.all(Service).values()
    ]
    print(all_services)
    if not service_id:
        return (jsonify(all_services))

    else:
        for service in all_services:
            if service['id'] == service_id:
                return (jsonify(service))

        return (jsonify({"Error": "Service not found"}))

"""
@app_views.route('/services/', methods=['POST'], strict_slashes=False)
def insert_service():

    all_services = storage.all(Service)

    props = request.get_json()
    if type(props) != dict:
        abort(400, description="Not a JSON")
    if not props.get("name"):
        abort(400, description="Missing Service Name")
    if not props.get("description"):
        abort(400, description="Missing Service Description")

    new_service = Service(**props)
    new_service.save()
    return jsonify(new_service.to_dict()), 201
"""

@app_views.route('/services/<service_id>', methods=['PUT'],
                 strict_slashes=False)
@token_required
def update_service(current_user, service_id):
    """
    updates service details
    """
    service = storage.get(Service, service_id)
    if service is None:
        abort(404, message="Not Found")

    props = request.get_json()
    if type(props) != dict:
        abort(400, message="Not a JSON")
    for key, value in props.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(service, key, value)

    storage.save()
    return jsonify(service.to_dict()), 200


@app_views.route('/services/<service_id>', methods=['DELETE'],
                 strict_slashes=False)
@token_required
def delete_service(current_user, service_id):
    """
    deletes a service from the database
    """
    service = storage.get(Service, service_id)
    if service is None:
        abort(404, message="Not Found")

    service.delete()
    storage.save()
    return jsonify({})
