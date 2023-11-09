#!/usr/bin/python3
"""
Defines requests for the drivers route
"""
from api.v1.auth import token_required
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.user import User
from models.image import Image
from models.vehicle import Vehicle
from models.driver_service import DriverService
from models.service import Service


@app_views.route('/drivers/', methods=['GET'], strict_slashes=False,
                 defaults={'driver_id': None})
@app_views.route('/drivers/<driver_id>/', methods=['GET'],
                 strict_slashes=False)
# @token_required
def get_drivers( driver_id):
    """
    retrievs driver data only
    """
    all_users = storage.all(User).values()
    images = storage.all(Image).values()
    all_vehicles = storage.all(Vehicle).values()
    all_driver_services = storage.all(DriverService).values()
    drivers = []

    for user in all_users:
        if user.role == 'driver':
            temp = user.to_dict()
            url = [{image.role: image.url} for image in images
                       if image.owner_id == user.id]
            temp["img"] = url
            drivers.append(temp)

    if not driver_id:
        for vehicle in all_vehicles:
            for driver in drivers:
                if vehicle.driver_id == driver['id']:
                    driver['vehicle'] = vehicle.to_dict()
        return (jsonify(drivers))
    else:
        driver_services = []

        for driver in drivers:
            if driver['id'] == driver_id:
                for vehicle in all_vehicles:
                    if vehicle.driver_id == driver['id']:
                        driver['vehicle'] = vehicle.to_dict()
                        break

                for service in all_driver_services:
                    if service.driver_id == driver['id']:
                        driver_services.append(service.to_dict())

                driver['services'] = driver_services
                return (jsonify(driver))

    return (jsonify({"Error": "Driver not found"}))
