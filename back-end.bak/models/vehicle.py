#!/usr/bin/python3
"""
Contains Vehicle model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Enum, ForeignKey
from sqlalchemy.orm import relationship


class Vehicle(BaseModel, Base):
    """representation of a vehicle"""
    __tablename__ = 'vehicles'
    driver_id = Column(String(60), ForeignKey('drivers.id'), nullable=False)
    make = Column(String(128), nullable=False)
    vehicle_type = Column(Enum('A', 'B', 'C'), nullable=False)
    vehicle_registration = Column(String(128), nullable=False)
    location = Column(String(128), nullable=False) #location of operation
    trips = relationship("Trip", backref="vehicle", cascade="all, delete-orphan")
