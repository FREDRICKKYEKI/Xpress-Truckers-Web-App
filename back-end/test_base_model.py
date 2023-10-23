#!/usr/bin/python3
from models.user import User
from models import storage

a = storage.all()
for item in a.values():
    print(item)

"""
print("JSON of my_model:")
for key in my_model_json.keys():
    print("\t{}: ({}) - {}".format(key, type(my_model_json[key]),
                                   my_model_json[key]))
"""
