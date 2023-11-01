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
 * Icon for the destination marker on the map.
 * @type {L.Icon}
 */
export const destinationIcon: L.Icon = L.icon({
  iconUrl: "/markers/destination-marker.svg",
  iconSize: [38, 38],
  iconAnchor: [16, 32],
});

/**
 * Defines a large truck icon for Leaflet maps.
 * @type {L.Icon}
 * @remarks
 * This icon is used to represent large trucks on the map.
 */
export const truckLargeIcon: L.Icon = L.icon({
  iconUrl: "/truck-markers/truck-large.png",
  iconSize: [100, 50],
  iconAnchor: [16, 32],
});

/**
 * Represents a medium-sized truck icon for Leaflet maps.
 * @type {L.Icon}
 * @remarks
 * This icon is used to represent medium-sized trucks on the map.
 */
export const truckMediumIcon: L.Icon = L.icon({
  iconUrl: "/truck-markers/truck-medium-no-bg.png",
  iconSize: [90, 50],
  iconAnchor: [16, 32],
});

/**
 * Represents a small truck icon for Leaflet maps.
 * @type {L.Icon}
 */
export const truckSmallIcon: L.Icon = L.icon({
  iconUrl: "/truck-markers/truck-small.png",
  iconSize: [100, 50],
  iconAnchor: [50, 25],
});
