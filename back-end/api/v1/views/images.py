#!/usr/bin/python3
"""
Defines the routes for vehicles route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.image import Image


@app_views.route('/images/', methods=['GET'], strict_slashes=False,
                 defaults={'owner_id': None})
@app_views.route('/images/<owner_id>/', methods=['GET'],
                 strict_slashes=False)
@token_required
def get_image(current_user, owner_id):
    """
    retrievs image data only for users
    """
    if not owner_id:
        all_images = [
            image.to_dict() for image in storage.all(Image).values()
        ]
        return (jsonify(all_images))

    else:
        images = storage.all(Image).values()
        out = []
        for image in images:
            if image.owner_id == owner_id:
                out.append(image.to_dict())
        if image != []:
            return (jsonify(out))

        abort(jsonify(massage="Image not found"), 404)


@app_views.route('/images/', methods=['POST'], strict_slashes=False)
@token_required
def insert_image(current_user):
    """
    creates a new image object
    """
    all_images = storage.all(Image)

    props = request.get_json()
    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)
    if not props.get("owner_id"):
        abort(jsonify(message="Missing Owner ID"), 400)
    if not props.get("role"):
        abort(jsonify(message="Missing Image Role/Type"), 400)
    if not props.get("url"):
        abort(jsonify(message="Missing Image"), 400)

    new_image = Image(owner_id=props.get('owner_id'),
                      role=props.get('role'),
                      url=props.get('url'))
    new_image.save()
    return jsonify(new_image.to_dict()), 201


@app_views.route('/images/<owner_id>', methods=['PUT'],
                 strict_slashes=False)
@token_required
def update_image(current_user, owner_id):
    """
    update an image object
    """
    props = request.get_json()
    if type(props) != dict:
        abort(jsonify(message="Not a JSON"), 400)

    images = storage.all(Image).values()

    role = props.get('role')
    url = props.get('url')
    for image in images:
        if image.owner_id == owner_id:
            if image.role == role:
                image.url = url
                image.save()
                return jsonify(image.to_dict()), 200

    return (jsonify({"Message": "Cannot update image"}))

@app_views.route('/images/<image_id>', methods=['DELETE'],
                 strict_slashes=False)
@token_required
def delete_image(current_user, image_id):
    """
    delete an image object
    """
    image = storage.get(Image, image_id)
    if image is None:
        abort(jsonify(message="Failed operation: Image not found"), 404)

    image.delete()
    storage.save()
    return jsonify({})
