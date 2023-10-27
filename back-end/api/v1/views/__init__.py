#!/usr/bin/python3
"""
defines the blueprints for the routes
"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.users import *
from api.v1.views.drivers import *
from api.v1.views.vehicles import *
from api.v1.views.trips import *
