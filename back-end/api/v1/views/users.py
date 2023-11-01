#!/usr/bin/python3
"""
Defines API routes for users and clients
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import abort, jsonify, request, make_response
from models import storage
from models.user import User
from models.vehicle import Vehicle
from models.driver_service import DriverService

@app_views.route('/users/', methods=['GET'], strict_slashes=False,
                 defaults={'user_id': None})
@app_views.route('/users/<user_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_users(current_user, user_id):
    """fetches all users (Drivers and clients)"""
    if not user_id:
        out = [user.to_dict() for user in storage.all(User).values()]
        return (jsonify(out))
    else:
        user = storage.get(User, user_id)
        if user:
            return (jsonify(user.to_dict()))

        return (jsonify({"Error": "User not found"}))


@app_views.route('/clients/', methods=['GET'], strict_slashes=False,
                 defaults={'client_id': None})
@app_views.route('/clients/<client_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_clients(current_user, client_id):
    """
    retrieves only client data
    """
    all_users = storage.all(User).values()
    clients = []

    for user in all_users:
        if user.role == 'user':
            clients.append(user.to_dict())

    if not client_id:
        return (jsonify(clients))
    else:
        for user in clients:
            if user['id'] == client_id:
                return (jsonify(user))
        return (jsonify({"Error": "Client not found"}))


@app_views.route('/users/', methods=['POST'], strict_slashes=False)
def insert_user():
    """
    insert a new user object
    """
    all_users = storage.all(User)

    props = request.get_json()
    if type(props) != dict:
        return make_response(jsonify({"error":"Not a JSON"}), 400);

    if not props.get("email"):
        return make_response(jsonify({"error":"Missing Email"}), 400);

    if not props.get("password"):
        return make_response(jsonify({"error":"Missing Password"}), 400);

    if not props.get("phonenumber"):
        return make_response(jsonify({"error":"Missing Phonenumber"}), 400);

    if not props.get("role"):
        return make_response(jsonify({"error":"Missing Role"}), 400);


    if props.get("email") in [user.email for user in all_users.values()]:
        return make_response(jsonify({"error":"Email already exists"}), 400);
    if props.get("phonenumber") in [user.phonenumber for user in all_users.values()]:
        return make_response(jsonify({"error":"Phone number already exists"}), 400);
    if props.get("role") not in ["user", "driver"]:
        return make_response(jsonify({"error":"Role must be user or driver"}), 400);

    if props.get("role") == "driver":
        if not props.get("vehicleModel"):
            return make_response(jsonify({"error":"Missing vehicle model"}), 400);
        if not props.get("vehicleRegistration"):
            return make_response(jsonify({"error":"Missing vehicle registration"}), 400);
        if not props.get("vehicleType"):
            return make_response(jsonify({"error":"Missing vehicle type"}), 400);
        if not props.get("latitude") or not props.get("longitude"):
            return make_response(jsonify({"error":"Invalid location data"}), 400);
        if not props.get("services"):
            return make_response(jsonify({"error":"Missing services"}), 400);

        new_user = User(first_name=props.get("first_name"),
                        last_name=props.get("last_name"),
                        email=props.get("email"),
                        password=props.get("password"),
                        phonenumber=props.get("phonenumber"),
                        role=props.get("role"));
        new_user.save()

        new_vehicle = Vehicle(make=props.get("vehicleModel"),
                              driver_id=new_user.id,
                              vehicle_registration=props.get("vehicleRegistration"),
                              vehicle_type=props.get("vehicleType"),
                              latitude=props.get("latitude"),
                              longitude=props.get("longitude"),
                              );
        new_vehicle.save()

        for service in props.get("services"):
            new_driver_service = DriverService(service_id=service,
                                        driver_id=new_user.id);
            new_driver_service.save()

        new_driver_service.save()
        response = jsonify(new_user.to_dict())
        response.status_code = 201
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response
    else:
        new_user = User(first_name=props.get("first_name"),
                        last_name=props.get("last_name"),
                        email=props.get("email"),
                        password=props.get("password"),
                        phonenumber=props.get("phonenumber"),
                        role=props.get("role"));

        new_user.save()
        return jsonify(new_user.to_dict()), 201


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
@token_required
def update_user(current_user, user_id):
    """
    update user details
    """
    user = storage.get(User, user_id)
    if user is None:
        abort(404)

    props = request.get_json()
    if type(props) != dict:
        abort(400, description="Not a JSON")
    for key, value in props.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(user, key, value)

    storage.save()
    return jsonify(user.to_dict()), 200


@app_views.route('/users/<user_id>', methods=['DELETE'], strict_slashes=False)
@token_required
def delete_user(current_user, user_id):
    """
    deletes a user from the database
    """
    user = storage.get(User, user_id)
    if user is None:
        abort(404)

    user.delete()
    storage.save()
    return jsonify({})
