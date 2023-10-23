import React, { useEffect } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import "../styles/home.css";
import { useSelector } from "react-redux";
import { MapMarker } from "./MapMarker";

export const MapBG = ({ loading }) => {
  const positionData = useSelector((state) => state.currentLocation);
  const center = Object.values(positionData?.geometry);

  if (loading) return <div>Loading...</div>;

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarker PositionData={positionData} center={center} />
    </MapContainer>
  );
};
