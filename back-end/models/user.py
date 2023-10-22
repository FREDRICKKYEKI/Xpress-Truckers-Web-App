#!/usr/bin/python3
"""
Contains User model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Enum
from sqlalchemy.orm import relationship
from hashlib import md5


class User(BaseModel, Base):
    """Representation of a user """
    __tablename__ = 'users'
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    phonenumber = Column(String(128), nullable=True)
    role = Column(Enum('user', 'driver', 'admin'), nullable=False, default='user')
    ratings = Column(String(128), nullable=True)
    vehicles = relationship("Vehicle", backref="user", cascade="all, delete-orphan")
    images = relationship("Image", backref="user", cascade="all, delete-orphan")
    driver_services = relationship("DriverService", backref="user", cascade="all, delete-orphan")
    trips = relationship("Trip", backref="user", cascade="all, delete-orphan")


    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)

