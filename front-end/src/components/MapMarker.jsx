import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export const MapMarker = ({ center, PositionData }) => {
  const map = useMap();
  useEffect(() => {
    map.panTo(center);
  }, [PositionData]);

  return (
    <Marker draggable={true} position={center}>
      <Popup>
        <div className="text-center">{PositionData?.formatted}</div>
      </Popup>
    </Marker>
  );
};
