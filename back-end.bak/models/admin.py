#!/usr/bin/python3
"""
Contains Admin model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Enum
from sqlalchemy.orm import relationship
from hashlib import md5


class Admin(BaseModel, Base):
    """Representation of a user """
    __tablename__ = 'admin'
    role = Column(String(128), nullable=False, default='admin')
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    phonenumber = Column(String(128), nullable=True)
    ratings = Column(String(128), nullable=True)
    images = relationship("Image", backref="admin", cascade="all, delete-orphan")
    # trips = relationship("Trip", backref="admin", cascade="all, delete-orphan")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
