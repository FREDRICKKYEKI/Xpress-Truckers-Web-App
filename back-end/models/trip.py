#!/usr/bin/python3
"""
Contains Trip model
"""
from datetime import datetime
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship


class Trip(BaseModel, Base):
    """representation of a trip"""
    __tablename__ = 'trips'
    client_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    driver_id = Column(String(60), ForeignKey('users.id'), nullable=True)
    vehicle_id = Column(String(60), ForeignKey('vehicles.id'), nullable=True)
    service_id = Column(String(60), ForeignKey('services.id'), nullable=False)
    origin = Column(String(128), nullable=False)
    destination = Column(String(128), nullable=False)
    start_at = Column(DateTime, default=datetime.utcnow)
    end_at = Column(DateTime)
    status = Column(Enum('pending', 'ongoing', 'finished', 'cancelled'), nullable=False, default='pending')
