#!/usr/bin/python3
"""
Defines requests for the drivers route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import jsonify, url_for, request
from models import storage
from models.image import Image
from werkzeug.utils import secure_filename
from os import path

UPLOAD_FOLDER = '../imgs'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

@app_views.route('/post_img/', methods=['POST'],
                 strict_slashes=False)
@token_required
def upload_image(current_user):
    """
    posts an image
    """
    # post image
    # doesn't check if image exists already
    # check on issue of files with same name: I'll add timestamp to name
    images = request.files
    # set profile image
    profile = images['profile']
    if profile:
        filename = secure_filename(profile.filename)
        url = path.join(UPLOAD_FOLDER, filename)
        profile.save(url)

        new_img = Image(owner_id=current_user.id, role='profile', url=url)
        new_img.save()
    # set vehicle image
    vehicle = images['vehicle']
    if vehicle:
        filename = secure_filename(vehicle.filename)
        url = path.join(UPLOAD_FOLDER, filename)
        vehicle.save(url)

        new_img = Image(owner_id=current_user.id, role='vehicle', url=url)
        new_img.save()
    # set license image
    # set user-id image

    return jsonify(message="OK"), 201
