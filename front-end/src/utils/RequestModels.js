export class DriverRequest {
  constructor(origin, destination, vehicleType, services) {
    this.origin = origin;
    this.destination = destination;
    this.vehicleType = vehicleType;
    this.services = services;
  }
}
