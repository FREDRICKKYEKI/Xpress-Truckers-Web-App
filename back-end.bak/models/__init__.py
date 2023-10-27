"""
contains all the models for the database:
    - User
    - Vehicle
    - Trip
    - Image
    - Service
    - DriverService
"""
from models.admin import Admin
from models.base_model import BaseModel
from models.client import Client
from models.driver import Driver
from models.driver_service import DriverService
from models.image import Image
from models.service import Service
from models.trip import Trip
from models.vehicle import Vehicle
from models.db_engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
