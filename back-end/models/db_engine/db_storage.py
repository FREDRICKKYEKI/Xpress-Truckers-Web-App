#!/usr/bin/python3
"""
Handles the database management
"""
from models.base_model import BaseModel, Base
from models.driver_service import DriverService
from models.image import Image
from models.service import Service
from models.trip import Trip
from models.user import User
from models.vehicle import Vehicle
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"DriverService": DriverService, "Image": Image,
           "Service": Service, "Trip": Trip, 'User': User,
           'Vehicle': Vehicle}


class DBStorage:
    """
    this class interacts with the MySQL database
    """
    __engine = None
    __session = None

    def __init__(self):
        """
        Instantiate the db object
        """
        XT_ENV = getenv('XT_ENV')
        XT_MYSQL_USER = getenv('XT_MYSQL_USER')
        XT_MYSQL_PORT = getenv('XT_MYSQL_PORT')
        XT_MYSQL_DB = getenv('XT_MYSQL_DB')
        XT_MYSQL_HOST = getenv('XT_MYSQL_HOST')
        XT_MYSQL_PWD = getenv('XT_MYSQL_PWD')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(XT_MYSQL_USER,
                                             XT_MYSQL_PWD,
                                             XT_MYSQL_HOST,
                                             XT_MYSQL_DB),
                                      pool_pre_ping=True)
        if XT_ENV == 'test':
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """
        get all class objects in the database
        """
        new_dict = {}
        for item in classes:
            if cls is None or cls is item or cls is classes[item]:
                objs = self.__session.query(classes[item]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """
        add a new object to current database session
        """
        if obj:
            self.__session.add(obj)

    def save(self):
        """
        saves the changes for the current session
        """
        self.__session.commit()

    def delete(self, obj=None):
        """
        deletes an object
        """
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """
        reloads data from the database
        """
        Base.metadata.create_all(self.__engine)
        session = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(session)
        self.__session = Session

    def get(self, cls, id):
        """
        gets an object given class and id
        """
        from models import storage

        if cls not in classes.values():
            return None
        all_cls = storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

    def count(self, cls=None):
        """counts the number of items in classes"""
        from models import storage
        count = len(storage.all(cls))
        return count

    def close(self):
        """
        closes the current session
        """
        self.__session.remove()
