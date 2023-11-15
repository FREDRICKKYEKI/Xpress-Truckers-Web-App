import { Dispatch, SetStateAction } from "react";

export type editType = "register" | "update";

export type serviceType = "A" | "B" | "C" | "D";

export type methods = "GET" | "POST" | "PUT" | "DELETE";

export type vehicleType = "A" | "B" | "C";

export type tripStatus = "pending" | "ongoing" | "finished" | "cancelled";

export type storedService = {
  [key: string]: serviceResponse;
};

export type latlng = { lat: number; lng: number };

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

export type serviceResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  type: serviceType;
  name: string;
  description: string;
};

export type driverServices = {
  id: string;
  created_at: string;
  updated_at: string;
  driver_id: string;
  service_id: string;
};

export type userToken = {
  token: string;
  user: userResponse | driverResponse;
};

export type locationData = {
  name: string;
  formatted: string;
  geometry: latlng;
};

export interface userRequest {
  phonenumber: string;
  first_name: string;
  last_name: string;
  role: userTypes;
  password: string;
  email: string;
}

export interface driverRequest extends userRequest {
  vehicleRegistration: string;
  vehicleType: string;
  vehicleModel: string;
  latitude: string;
  longitude: string;
  services: string[];
}

export interface userResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phonenumber: string;
  ratings: number;
  role: userTypes;
}

export interface driverResponse extends userResponse {
  vehicle: {
    id: string;
    created_at: string;
    updated_at: string;
    vehicle_registration: string;
    vehicle_type: vehicleTypes;
    make: string;
    latitude: number;
    longitude: number;
  };
  services: driverServices[];
}

export interface childrenProps {
  children: React.ReactNode;
}

export interface AuthContextInterface {
  currentUser: userResponse | null;
  setCurrentUser: Dispatch<SetStateAction<userResponse | null>>;
  token: userToken | null;
  setToken: Dispatch<SetStateAction<userToken | null>>;
}

export interface driverRequestType {
  origin: {};
  destination: {};
  vehicleType: string[];
  services: string[];
}

export interface TripPostRequest {
  client_id: string;
  driver_id: string;
  vehicle_id: string;
  origin: latlng;
  destination: latlng;
  status: tripStatus;
}

export interface TripResponse {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  driver_id: string;
  vehicle_id: string;
  origin: string;
  destination: string;
  status: tripStatus;
  start_at: string;
  end_at: string;
  type: "type1" | "type2";
}

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

/**
 * Enum representing the types of vehicles.
 */
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

/**
 * Enum for edit types.
 * @readonly
 * @enum {string}
 */
export enum editTypes {
  REGISTER = "register",
  UPDATE = "update",
}

export enum tripStatuses {
  PENDING = "pending",
  ONGOING = "ongoing",
  FINISHED = "finished",
  CANCELLED = "cancelled",
}
