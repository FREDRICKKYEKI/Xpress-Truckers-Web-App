import { userTypes } from "./constants";

export type driver = {
  id: number;
  name: string;
  email: string;
  phone: string;
  usertype: userTypes;
  vehicleRegistration: string;
  vehicleType: string;
  vehicleModel: string;
  placeOperation: string;
  services: string[];
};

export type user = {
  id: number;
  name: string;
  email: string;
  phone: string;
  usertype: userTypes;
};

export type userLoginEmail = {
  email: string;
  password: string;
};

export type userLoginPhone = {
  phone: string;
  password: string;
};
