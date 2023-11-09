import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { MapMarkers } from "./MapMarkers";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import "../styles/home.css";
import { RootState, setDrivers } from "../StateManagement/store";
import { useEffect } from "react";
import { getXTData } from "../utils/utils";
import { apiEndpoints } from "../utils/constants";

export const MapBG = ({ originRef, destinationRef }: any) => {
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  );
  const destination = useSelector((state: RootState) => state.destination);
  const center = currentLocation.geometry;
  const dispatch = useDispatch();

  useEffect(() => {
    getXTData(apiEndpoints.drivers)
      .then((data: unknown) => {
        dispatch(setDrivers(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        originRef={originRef}
        destinationRef={destinationRef}
      />
    </MapContainer>
  );
};
