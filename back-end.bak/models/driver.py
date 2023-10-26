#!/usr/bin/python3
"""
Contains User model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Enum
from sqlalchemy.orm import relationship
from hashlib import md5


class Driver(BaseModel, Base):
    """Representation of a user """
    __tablename__ = 'drivers'
    role = Column(String(128), nullable=False, default='driver')
    vehicles = relationship("Vehicle", backref="driver", cascade="all, delete-orphan")
    driver_services = relationship("DriverService", backref="driver", cascade="all, delete-orphan")
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    phonenumber = Column(String(128), nullable=True)
    ratings = Column(String(128), nullable=True)
    images = relationship("Image", backref="driver", cascade="all, delete-orphan")
    trips = relationship("Trip", backref="driver", cascade="all, delete-orphan")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
