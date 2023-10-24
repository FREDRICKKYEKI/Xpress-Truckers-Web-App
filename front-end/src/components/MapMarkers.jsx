import React, { useEffect, useMemo, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { destinationIcon, originIcon } from "../utils/utils";

export const MapMarkers = ({
  center,
  positionData,
  destinationData,
  locationTypes,
}) => {
  const map = useMap();
  const originMarkerRef = useRef();
  const destinationMarkerRef = useRef();

  function updateLocation(locationType, latLng) {
    if (locationType === locationTypes.ORIGIN) {
      map.panTo(latLng);
    } else {
      map.flyTo(latLng);
    }
  }

  return (
    <>
      <Marker
        icon={originIcon}
        draggable={true}
        ref={originMarkerRef}
        eventHandlers={useMemo(
          () => ({
            dragend() {
              const marker = originMarkerRef.current;
              if (marker != null) {
                updateLocation(locationTypes.ORIGIN, marker.getLatLng());
              }
            },
          }),
          []
        )}
        position={center}
      >
        <Popup>
          <h4>Current Location</h4>
          <div className="text-center">{positionData?.formatted}</div>
        </Popup>
      </Marker>
      {destinationData && (
        <Marker
          ref={destinationMarkerRef}
          icon={destinationIcon}
          eventHandlers={useMemo(
            () => ({
              dragend() {
                const marker = destinationMarkerRef.current;
                if (marker != null) {
                  updateLocation(locationTypes.DESTINATION, marker.getLatLng());
                }
              },
            }),
            []
          )}
          draggable={true}
          position={Object.values(destinationData?.geometry)}
        >
          <Popup>
            <h4>Destination</h4>
            <div className="text-center">{destinationData?.formatted}</div>
          </Popup>
        </Marker>
      )}
    </>
  );
};
