import L from "leaflet";
import { envs } from "./loadEnv";

/**
 * Returns a promise that resolves to the current location of the user.
 * @returns {Promise<Position>} A promise that resolves to the current position of the user.
 * @throws {string} If geolocation is not supported by the browser.
 */
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator?.geolocation) {
      console.log("Geolocation is not supported by your browser");
      reject("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        resolve(position);
      },
      (error) => {
        reject(error);
        if (error.code === 1) {
          console.log("Geolocation permission denied by the user.");
        } else {
          console.error("Geolocation error:", error);
        }
      }
    );
  });
}

/**
 * Returns a promise that resolves to the location data for the given latitude and longitude.
 * @param {Object} location - The location object containing latitude and longitude.
 * @param {number} location.lat - The latitude of the location.
 * @param {number} location.lng - The longitude of the location.
 * @returns {Promise<Object>} A promise that resolves to the location data for the given latitude and longitude.
 * @throws {Error} If there is an error while fetching the location data.
 */
export function getLocationData({ lat: latitude, lng: longitude }) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${envs.geoCodeApi}&language=en&pretty=1`
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * The icon for the origin location.
 * @type {L.Icon}
 */
export const originIcon = L.icon({
  iconUrl: "/markers/origin-marker.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

/**
 * The icon for the destination location.
 * @type {L.Icon}
 */
export const destinationIcon = L.icon({
  iconUrl: "/markers/destination-marker.svg",
  iconSize: [38, 38],
  iconAnchor: [16, 32],
});

/**
 * The types of location.
 * @enum {string}
 */
export const locationTypes = {
  ORIGIN: "ORIGIN",
  DESTINATION: "DESTINATION",
};

/**
 * The states of a promise.
 * @enum {string}
 */
export const promiseStates = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};
