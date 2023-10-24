import L from "leaflet";
import { envs } from "./loadEnv";

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

export function getLocationData({ lat: latitude, lng: longitude }) {
  // const openstreetmapurl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

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

export const originIcon = L.icon({
  iconUrl: "/markers/origin-marker.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

export const destinationIcon = L.icon({
  iconUrl: "/markers/destination-marker.svg",
  iconSize: [38, 38],
  iconAnchor: [16, 32],
});

export const locationTypes = {
  ORIGIN: "ORIGIN",
  DESTINATION: "DESTINATION",
};
