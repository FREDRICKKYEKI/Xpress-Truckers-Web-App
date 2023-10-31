#!/usr/bin/python3
"""
Contains Service model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship


class Service(BaseModel, Base):
    """representation of a service"""
    __tablename__ = 'services'
    name = Column(String(128), nullable=False)
    type = Column(Enum('A', 'B', 'C', 'D'), nullable=False)
    description = Column(String(128), nullable=False)
