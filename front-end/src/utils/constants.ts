import { locationData } from "./types";

export const COMPANY_NAME: string = "Xpress Truckers";

export const defaultAvatarUrl: string =
  "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg";

export const UNSPLASH_ROOT: string = "https://api.unsplash.com";

export const apiUrl: string = "http://127.0.0.1:5000/api/v1";

export const initialLocationData: locationData = {
  formatted: "Nairobi, Kenya",
  name: "Nairobi, Kenya",
  geometry: {
    lat: -1.292066,
    lng: 36.821946,
  },
};

/**
 * An array of vehicle types with their corresponding id, type, and name.
 */
export const VEHICLE_TYPES = [
  { id: 0, type: "A", name: "Pick-Up" },
  { id: 1, type: "B", name: "Lorry" },
  { id: 2, type: "C", name: "Large Size Truck" },
];

export const VEHICLE_SIZE_TYPES = {
  A: "Pick-Up Truck",
  B: "Lorry",
  C: "Large Size Truck",
};

export const apiEndpoints = {
  userSignUp: "users/",
  userLogin: "login/",
  services: "services/",
  drivers: "drivers/",
  filteredDrivers: "filter_vehicles/",
  driver: (id: string | undefined) => (id ? `drivers/${id}` : "drivers/none"),
  user: (id: string | undefined) => (id ? `users/${id}` : "users/none"),
};

export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  profile: "/profile/me",
  editUser: "/profile/me/edit",
  driverRoute: "/driver/:id",
  landingPage: "http://144.126.221.185/",
  driverDashboard: "/driver/dashboard",
  driver: (id: string) => `/driver/${id}`,
};
