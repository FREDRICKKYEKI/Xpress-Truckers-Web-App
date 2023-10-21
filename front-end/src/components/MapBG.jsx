import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import "../styles/home.css";
import { useSelector } from "react-redux";
import { TruckRequestForm } from "./TruckRequestForm";

export const MapBG = ({ loading }) => {
  const position = useSelector((state) => state.currentLocation);

  if (loading) return <div>Loading...</div>;
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
