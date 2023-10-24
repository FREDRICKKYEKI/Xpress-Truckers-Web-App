export class DriverRequest {
  constructor(
    origin = null,
    destination = null,
    vehicleType = null,
    services = null
  ) {
    this.origin = origin;
    this.destination = destination;
    this.vehicleType = vehicleType;
    this.services = services;
  }

  isValid() {
    if (!this.origin) {
      throw Error("Current location not selected!");
    } else if (!this.destination) {
      throw Error("Destination not selected!");
    } else if (!this.vehicleType && this.vehicleType === "null") {
      throw Error("Vehicle Type not selected!");
    } else if (!this.services || this.services.length === 0) {
      throw Error("Services not selected!");
    }

    return true;
  }
}

export class LocationDataResponse {
  constructor(data) {}
}
