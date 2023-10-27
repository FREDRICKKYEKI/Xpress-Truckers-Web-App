#!/usr/bin/python3
from models.driver_service import DriverService
from models.image import Image
from models.service import Service
from models.trip import Trip
from models.user import User
from models.vehicle import Vehicle

from models import storage

users = storage.all(User).values()
for user in users:
    if user.id == '28f43756-8129-4ebc-bc60-1c55a409ea64':
        user.role = 'driver'

storage.save()
users = storage.all(User).values()

for user in users:
    print(user)

"""
new = User(first_name='kwargs', last_name='model', email='lennoxnams@example.com',
           password='lennox_pwd',role='user')

print(new)

new.save()
print('\n----All----\n')
print(a)

print('\n----Values----\n')
for item in a.values():
    print(item)
print('\n-----Users-----\n')
b = storage.all(User)
for item in b.values():
    print(item)

storage.save()
"""
"""
print("JSON of my_model:")
for key in my_model_json.keys():
    print("\t{}: ({}) - {}".format(key, type(my_model_json[key]),
                                   my_model_json[key]))
"""
