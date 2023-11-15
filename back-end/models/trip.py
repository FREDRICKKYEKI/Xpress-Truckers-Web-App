#!/usr/bin/python3
"""
Contains Trip model
"""
from datetime import datetime
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, DateTime, Enum


class Trip(BaseModel, Base):
    """representation of a trip"""
    __tablename__ = 'trips'
    client_id = Column(String(60), ForeignKey('users.id'), nullable=False)  # problem might be here
    driver_id = Column(String(60), nullable=True)  # and here
    vehicle_id = Column(String(60), ForeignKey('vehicles.id'), nullable=True)
    start_at = Column(DateTime, nullable=True)
    end_at = Column(DateTime,  nullable=True)
    origin = Column(String(240), nullable=False)
    destination = Column(String(240), nullable=False)
    status = Column(Enum('pending', 'ongoing', 'finished', 'cancelled'),
                    nullable=False, default='pending')
