import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { MapMarkers } from "./MapMarkers";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import "../styles/home.css";
import { useDrivers } from "../hooks/useDrivers";

export const MapBG = ({ locationTypes, originRef, destinationRef }) => {
  const currentLocation = useSelector((state) => state.currentLocation);
  const destination = useSelector((state) => state.destination);
  const center = Object.values(currentLocation?.geometry);
  const [isLoading, drivers] = useDrivers();

  console.log(drivers);

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers
        positionData={currentLocation}
        center={center}
        destinationData={destination}
        locationTypes={locationTypes}
        originRef={originRef}
        destinationRef={destinationRef}
        drivers={drivers}
        isLoading={isLoading}
      />
    </MapContainer>
  );
};
