export const COMPANY_NAME = "Xpress Truckers";

export const defaultAvatarUrl =
  "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg";

export const UNSPLASH_ROOT = "https://api.unsplash.com";

export const apiUrl = "http://127.0.0.1:5000/api/v1/";

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
 */
export enum userTypes {
  DRIVER = "driver",
  REGULAR = "user",
}

/**
 * Enum representing the types of login methods available.
 */
export enum logInTypes {
  PHONE = "phone",
  EMAIL = "email",
}

/**
 * An array of objects representing the available services.
 * Each object contains an id and a name.
 */
export const SERVICES = [
  {
    id: 0,
    name: "Moving out",
  },
  {
    id: 1,
    name: "Transport Construction Materials",
  },
  {
    id: 2,
    name: "Transport Farm Produce",
  },
  {
    id: 3,
    name: "Long Distance Transportation",
  },
];

/**
 * An array of vehicle types with their corresponding id, type, and name.
 */
export const VEHICLE_TYPES = [
  { id: 0, type: "A", name: "Pick-Up" },
  { id: 1, type: "B", name: "Lorry" },
  { id: 2, type: "C", name: "Large Size Truck" },
];
