import React, { useEffect, useMemo, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { destinationIcon, getLocationData, originIcon } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setCurrentLocation, setDestination } from "../StateManagement/store";
import { LocationDataResponse } from "../utils/DataModels";
import { toast } from "react-toastify";

export const MapMarkers = ({
  center,
  positionData,
  destinationData,
  locationTypes,
  originRef,
  destinationRef,
}) => {
  const map = useMap();
  const dispatch = useDispatch();
  const originMarkerRef = useRef();
  const destinationMarkerRef = useRef();

  function updateLocation(locationType, latLng) {
    toast.loading("Updating location...", {
      position: toast.POSITION.TOP_CENTER,
      closeButton: true,
    });
    getLocationData(latLng)
      .then((data) => {
        toast.dismiss();
        const location = new LocationDataResponse(data.results[0]);
        if (locationType === locationTypes.ORIGIN) {
          dispatch(setCurrentLocation(location.toObject()));
          originRef.current.value = location?.formatted;
        } else {
          dispatch(setDestination(location.toObject()));
          destinationRef.current.value = location?.formatted;
        }
        toast.success("Updated succesfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10,
        });
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Error!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10,
        });
        console.error(error);
      });
  }

  useEffect(() => {
    if (positionData) {
      map.panTo(center);
    }
  }, [positionData]);

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
          eventHandlers={{
            dragend() {
              const marker = destinationMarkerRef.current;
              if (marker != null) {
                updateLocation(locationTypes.DESTINATION, marker.getLatLng());
              }
            },
          }}
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
