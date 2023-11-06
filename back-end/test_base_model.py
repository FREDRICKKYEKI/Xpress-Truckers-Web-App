#!/usr/bin/python3
from models.driver_service import DriverService
from models.image import Image
from models.service import Service
from models.trip import Trip
from models.user import User
from models.vehicle import Vehicle
from hashlib import md5

from models import storage

#user = User.session.query.filter_by(email='lennoxnams@example.com').first()
users = storage.all(User).values()
for user in users:
    print(user)

storage.save()
"""
storage.save()
users = storage.all(User).values()

for user in users:
    print(user)
"""

"""
print('\n----All----\n')
print(users)

print('\n----Values----\n')
for item in users:
    print(item)
print('\n-----Users-----\n')

b = storage.all(User)
for item in b.values():
    print(item)


storage.save()

print("JSON of my_model:")
for key in my_model_json.keys():
    print("\t{}: ({}) - {}".format(key, type(my_model_json[key]),
                                   my_model_json[key]))
"""
