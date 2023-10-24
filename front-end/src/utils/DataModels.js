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

  toObject() {
    return {
      origin: this.origin,
      destination: this.destination,
      vehicleType: this.vehicleType,
      services: this.services,
    };
  }
}

export class LocationDataResponse {
  constructor(data) {
    this.bounds = data.bounds;
    this.formatted = data.formatted;
    this.geometry = data.geometry;
  }

  isValid() {
    if (!this.bounds) {
      throw Error("Bounds not found!");
    } else if (!this.formatted) {
      throw Error("Formatted address not found!");
    } else if (!this.geometry) {
      throw Error("Geometry not found!");
    }
    return true;
  }
  toObject() {
    return {
      bounds: this.bounds,
      formatted: this.formatted,
      geometry: this.geometry,
    };
  }
}
