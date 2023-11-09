export type editType = "register" | "update";

export type serviceType = "A" | "B" | "C" | "D";

export type methods = "GET" | "POST" | "PUT" | "DELETE";

export type driver = {
  name: string;
  email: string;
  password: string;
  role: userTypes;
  phonenumber: string;
  vehicleRegistration: string;
  vehicleType: string;
  vehicleModel: string;
  latitude: string;
  longitude: string;
  services: string[];
};

export type user = {
  phonenumber: string;
  first_name: string;
  last_name: string;
  role: userTypes;
  password: string;
  email: string;
};

export type userLoginEmail = {
  email: string;
  password: string;
  type: logInTypes;
};

export type userLoginPhone = {
  phone: string;
  password: string;
  type: logInTypes;
};

/**
 * The types of location.
 * @enum {string}
 */
export enum locationTypes {
  ORIGIN = "ORIGIN",
  DESTINATION = "DESTINATION",
}

/**
 * The states of a promise.
 * @enum {string}
 */
export enum promiseStates {
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}

/**
 * Enum representing the types of users in the application.
 * @enum {string}
 */
export enum userTypes {
  DRIVER = "driver",
  REGULAR = "user",
}
export type vehicleType = "A" | "B" | "C";
export enum vehicleTypes {
  typeA = "A",
  typeB = "B",
  typeC = "C",
  typeNull = "null",
}

/**
 * Enum representing the types of login methods available.
 */
export enum logInTypes {
  PHONE = "phone",
  EMAIL = "email",
}

export interface childrenProps {
  children: React.ReactNode;
}

export type locationData = {
  name: string;
  formatted: string;
  geometry: { lat: number; lng: number };
};

export type driverResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phonenumber: string;
  role: userTypes;
  vehicle: {
    vehicle_registration: string;
    vehicle_type: vehicleTypes;
    make: string;
    latitude: number;
    longitude: number;
  };
  rating: number;
  services: driverServices[];
};

export type userResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phonenumber: string;
  rating: number;
  role: userTypes;
};

export type serviceResponse = {
  created_at: string;
  description: string;
  id: string;
  name: string;
  type: serviceType;
  updated_at: string;
};

export type storedService = {
  [key: string]: serviceResponse;
};

export type driverServices = {
  id: string;
  created_at: string;
  updated_at: string;
  driver_id: string;
  service_id: string;
};

export enum editTypes {
  REGISTER = "register",
  UPDATE = "update",
}

export type userToken = {
  token: string;
  user: userResponse | driverResponse;
};

export interface AuthContextInterface {
  currentUser: userResponse | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<userResponse | null>>;
  token: userToken | null;
  setToken: React.Dispatch<React.SetStateAction<userToken | null>>;
}

export interface driverRequestType {
  origin: {};
  destination: {};
  vehicleType: string[];
  services: string[];
}
