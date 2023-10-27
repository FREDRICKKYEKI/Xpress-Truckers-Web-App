#!/usr/bin/env python3
from models.base_model import BaseModel, Base
from models.driver_service import DriverService
from models.image import Image
from models.service import Service
from models.trip import Trip
from models.user import User
from models.vehicle import Vehicle

classes = {"DriverService": DriverService, "Image": Image, "Service": Service,
           "Trip": Trip, 'User': User, 'Vehicle': Vehicle}

for item in classes:
    print(item)
