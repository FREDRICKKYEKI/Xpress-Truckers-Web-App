#!/usr/bin/python3
"""
Contains DriverService model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class DriverService(BaseModel, Base):
    """representation of a driver service"""
    __tablename__ = 'driver_services'
    driver_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    service_id = Column(String(60), ForeignKey('services.id'), nullable=False)
