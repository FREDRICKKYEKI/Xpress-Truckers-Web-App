import L from "leaflet";

/**
 * The icon for the origin location.
 * @type {L.Icon}
 */
export const originIcon: L.Icon = L.icon({
  iconUrl: "/markers/origin-marker.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

/**
 * The icon for the destination location.
 * @type {L.Icon}
 */
export const destinationIcon: L.Icon = L.icon({
  iconUrl: "/markers/destination-marker.svg",
  iconSize: [38, 38],
  iconAnchor: [16, 32],
});

export const truckLargeIcon: L.Icon = L.icon({
  iconUrl: "/truck-markers/truck-large.png",
  iconSize: [100, 50],
  iconAnchor: [16, 32],
});

export const truckMediumIcon: L.Icon = L.icon({
  iconUrl: "/truck-markers/truck-medium-no-bg.png",
  iconSize: [90, 50],
  iconAnchor: [16, 32],
});

export const truckSmallIcon: L.Icon = L.icon({
  iconUrl: "/truck-markers/truck-small.png",
  iconSize: [100, 50],
  iconAnchor: [50, 25],
});
