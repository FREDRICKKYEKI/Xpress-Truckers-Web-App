#!/usr/bin/python3
"""
Defines API routes for users and clients
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.user import User


@app_views.route('/users/', methods=['GET'], strict_slashes=False,
                 defaults={'user_id': None})
@app_views.route('/users/<user_id>/', methods=['GET'],
                 strict_slashes=False)
def get_users(user_id):
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
def get_clients(client_id):
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
        abort(400, description="Not a JSON")
    if not props.get("email"):
        abort(400, description="Missing Email")
    if not props.get("phone"):
        abort(400, description="Missing Phone")
    if not props.get("role"):
        abort(400, description="Missing Role")
    if not props.get("password"):
        abort(400, description="Missing Password")

    new_user = User(**props)
    new_user.save()
    return jsonify(new_user.to_dict()), 201


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def update_user(user_id):
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
def delete_user(user_id):
    """
    deletes a user from the database
    """
    user = storage.get(User, user_id)
    if user is None:
        abort(404)

    user.delete()
    storage.save()
    return jsonify({})
