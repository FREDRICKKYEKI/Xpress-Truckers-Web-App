import { UNSPLASH_ROOT, apiEndpoints, apiUrl } from "./constants";
import { envs } from "./loadEnv";
import axios from "axios";
import { driver, user } from "./types";

/**
 * Returns a promise that resolves to the current location of the user.
 * @returns {Promise<Position>} A promise that resolves to the current position of the user.
 * @throws {string} If geolocation is not supported by the browser.
 */
export function getCurrentLocation(): Promise<any> {
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
 * @returns {Promise<JSON>} A promise that resolves to the location data for the given latitude and longitude.
 * @throws {Error} If there is an error while fetching the location data.
 */
export function getLocationData({
  lat: latitude,
  lng: longitude,
}: {
  lat: number;
  lng: number;
}): Promise<JSON> {
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
 * Performs a geosearch using the OpenCageData API.
 * @param text - The text to search for.
 * @returns A Promise that resolves to a JSON object containing the search results.
 */
export function geoSearch(text: string): Promise<JSON> {
  return new Promise((resolve, reject) => {
    fetch(`https://api.opencagedata.com/geosearch?q=${text}`, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "opencage-geosearch-key": `${envs.openCageApiKey}`,
        Referer: "https://opencagedata.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "GET",
    })
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
 * Fetches Unsplash photos based on a query string.
 * @param {Object} options - The options object.
 * @param {string} options.query - The query string to search for.
 * @returns {Promise<JSON>} A Promise that resolves with the fetched data in JSON format.
 */
export function getUnsplashPhotos({ query }: { query: string }): Promise<JSON> {
  return new Promise((resolve, reject) => {
    fetch(
      `${UNSPLASH_ROOT}/search/photos?page=${Math.floor(
        Math.random() * 10 + 1
      )}&query=${query}&client_id=${envs.unsplashApiAccessKey}&per_page=4`
    )
      .then((data) => data.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Fetches data from the specified endpoint using the Xpress Truckers API.
 * @param endpoint - The endpoint to fetch data from.
 * @returns A Promise that resolves with the fetched data in JSON format.
 */
export function getXTData(endpoint: string): Promise<JSON> {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/${endpoint}`)
      .then((data) => data.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

/**
 * Registers a user or driver by sending a POST request to the server.
 * @param user The user or driver object to be registered.
 * @returns A Promise that resolves with the JSON response from the server.
 */
export function registerUser(user: user | driver): Promise<JSON> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/${apiEndpoints.userSignUp}`, user)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}
