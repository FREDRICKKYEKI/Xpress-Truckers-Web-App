#!/usr/bin/python3
"""
Defines API routes for users and clients
"""
from api.v1.views import app_views
from flask import jsonify
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
