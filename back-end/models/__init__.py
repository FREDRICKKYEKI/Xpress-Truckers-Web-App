"""
contains all the models for the database:
    - User
    - Vehicle
    - Trip
    - Image
    - Service
    - DriverService
"""
from models.base_model import BaseModel
from models.driver_service import DriverService
from models.image import Image
from models.service import Service
from models.trip import Trip
from models.user import User
from models.vehicle import Vehicle
from models.db_engine.db_storage import DBStorage
from dotenv import load_dotenv

load_dotenv()

storage = DBStorage()
storage.reload()
