#!/usr/bin/python3
"""
Contains Image model
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Enum, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship


class Image(BaseModel, Base):
    """representation of an image"""
    __tablename__ = 'images'
    owner_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    role = Column(Enum('profile', 'vehicle', 'license', 'user-id'), nullable=False)
    url = Column(String(128), nullable=False)
