import { logInTypes, userTypes } from "./utils";

export class DriverRequest {
  origin: {};
  destination: {};
  vehicleType: string;
  services: string[];
  constructor(
    origin = {},
    destination = {},
    vehicleType = "",
    services = []
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
    } else if (!this.vehicleType || this.vehicleType === "null") {
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

  toRequest() {
    return JSON.stringify(this.toObject());
  }
}

export class LocationDataResponse {
  __keys = ["bounds", "formatted", "geometry"];
  bounds: {};
  formatted: string;
  geometry: {};
  constructor({bounds={}, formatted="", geometry={}}) {
    this.bounds = bounds;
    this.formatted = formatted;
    this.geometry = geometry;
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

  validate() {
    try {
      for (const key of Object.keys(this.toObject())) {
        if (!this.__keys.includes(key) || !this[key]) {
          return false;
        }
        return true;
      }
    } catch (e) {
      console.log("Error");
      return false;
    }
  }
}

export class UserRegistrationData {
  private __car_reg_pattern = /^[a-zA-Z]{3} \d{3}[a-zA-Z]$/;
  private __email_reg_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phonenumber: string;
  usertype: string;
  vehicleRegistration: string;
  vehicleType: string;
  vehicleModel: string;
  placeOperation: {};
  services: string[];

  constructor({
    firstname = "",
    lastname = "",
    email = "",
    password = "",
    phonenumber = "",
    usertype = "",
    vehicleRegistration = "",
    vehicleType = "",
    vehicleModel = "",
    placeOperation = {},
    services = [],
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phonenumber = phonenumber;
    this.usertype = usertype;
    this.vehicleRegistration = vehicleRegistration;
    this.vehicleType = vehicleType;
    this.vehicleModel = vehicleModel;
    this.placeOperation = placeOperation;
    this.services = services;
  }

  isValid() {
    if (this.usertype == userTypes.REGULAR) {
      switch (true) {
        case !this.firstname: {
          throw Error("Firstname not provided!");
        }
        case !this.lastname: {
          throw Error("Lastname not provided!");
        }
        case !this.email: {
          throw Error("Email not provided!");
        }
        case !this.__email_reg_pattern.test(this.email): {
          throw Error("Invalid email!");
        }
        case !this.password: {
          throw Error("Password not provided!");
        }
        case !this.phonenumber: {
          throw Error("Phonenumber not provided!");
        }
      }

      return true;
    }
    switch (true) {
      case !this.firstname: {
        throw Error("Firstname not provided!");
      }
      case !this.lastname: {
        throw Error("Lastname not provided!");
      }
      case !this.email: {
        throw Error("Email not provided!");
      }
      case !this.__email_reg_pattern.test(this.email): {
        throw Error("Invalid email!");
      }
      case !this.password: {
        throw Error("Password not provided!");
      }
      case !this.phonenumber: {
        throw Error("Phonenumber not provided!");
      }
      case !this.vehicleRegistration: {
        throw Error("vehicle Registration not provided!");
      }
      case !this.__car_reg_pattern.test(this.vehicleRegistration): {
        throw Error("Invalid vehicle registration!");
      }
      case !this.vehicleType: {
        throw Error("Vehicle type not provided!");
      }
      case !this.vehicleModel: {
        throw Error("Vehicle model not provided!");
      }
      case !this.placeOperation: {
        throw Error("Place of operation not provided!");
      }
      case !new LocationDataResponse(this.placeOperation).validate(): {
        throw Error("Invalid place of operation!");
      }
      case !this.services || this.services.length < 1: {
        throw Error("Services not provided!");
      }
    }

    return true;
  }

  toObject() {
    if (this.usertype === userTypes.REGULAR) {
      return {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        phonenumber: this.phonenumber,
        usertype: this.usertype,
      };
    }
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      phonenumber: this.phonenumber,
      usertype: this.usertype,
      vehicleRegistration: this.vehicleRegistration,
      vehicleType: this.vehicleType,
      vehicleModel: this.vehicleModel,
      placeOperation: this.placeOperation,
      services: this.services,
    };
  }

  toRequest() {
    return JSON.stringify(this.toObject());
  }
}



export class UserLogInData {
  private __email_reg_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  email_phone: any;
  password: string;
  type: logInTypes;

  constructor({ email_phone = "", password = "", type = logInTypes.EMAIL }) {
    this.email_phone = email_phone;
    this.password = password;
    this.type = type;
  }

  isValid() {
    if (!this.email_phone) {
      throw Error("Email/Phone not provided!");
    } else if (
      (this.type === logInTypes.EMAIL &&
        !this.__email_reg_pattern.test(this.email_phone)) ||
      (this.type === logInTypes.PHONE && isNaN(this.email_phone))
    ) {
      throw Error("Invalid Email/Phone number!");
    } else if (!this.password) {
      throw Error("Password not provided!");
    }

    return true;
  }

  toObject() {
    if (this.type === logInTypes.EMAIL) {
      return {
        email: this.email_phone,
        password: this.password,
      };
    }
    return {
      phone: this.email_phone,
      password: this.password,
    };
  }

  toRequest() {
    return JSON.stringify(this.toObject());
  }
}
