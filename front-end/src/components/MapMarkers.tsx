import { useEffect, useMemo, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import {
  destinationIcon,
  truckLargeIcon,
  truckMediumIcon,
  truckSmallIcon,
  originIcon,
} from "../utils/mapMarkers";
import { getLocationData } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setCurrentLocation,
  setDestination,
} from "../StateManagement/store";
import { LocationDataResponse } from "../utils/DataModels";
import { toast } from "react-toastify";
import { DriverPopUp } from "./DriverPopUp";
import { locationData, locationTypes } from "../utils/types";

export const MapMarkers = ({
  center,
  positionData,
  destinationData,
  originRef,
  destinationRef,
}: {
  center: { lat: number; lng: number };
  positionData: locationData;
  destinationData: locationData | null;
  originRef: any;
  destinationRef: any;
}) => {
  const map = useMap();
  const dispatch = useDispatch();
  const originMarkerRef = useRef();
  const destinationMarkerRef = useRef();
  const drivers = useSelector((state: RootState) => state.drivers);

  function updateLocation(
    locationType: locationTypes,
    latLng: { lat: number; lng: number }
  ) {
    toast.loading("Updating location...", {
      position: toast.POSITION.TOP_CENTER,
      closeButton: true,
    });
    getLocationData(latLng)
      .then((data: any) => {
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
  type iconTypes = {
    [key: string]: any;
  };
  const iconTypes = {
    A: truckSmallIcon,
    B: truckMediumIcon,
    C: truckLargeIcon,
  };

  useEffect(() => {
    console.log(drivers);
  }, [drivers]);
  return (
    <>
      {drivers?.map((driver, index) => (
        <Marker
          key={driver?.id || index}
          riseOnHover={true}
          icon={iconTypes[driver?.vehicle?.vehicle_type as "A" | "B" | "C"]}
          position={[driver?.vehicle?.latitude, driver?.vehicle?.longitude]}
        >
          <Popup>
            <DriverPopUp driver={driver} />
          </Popup>
        </Marker>
      ))}

      <Marker
        icon={originIcon}
        draggable={true}
        ref={originMarkerRef as any}
        eventHandlers={useMemo(
          () => ({
            dragend() {
              const marker = originMarkerRef.current;
              if (marker != null) {
                updateLocation(
                  locationTypes.ORIGIN,
                  (marker as any).getLatLng()
                );
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
          ref={destinationMarkerRef as any}
          icon={destinationIcon}
          eventHandlers={{
            dragend() {
              const marker = destinationMarkerRef.current;
              if (marker != null) {
                updateLocation(
                  locationTypes.DESTINATION,
                  (marker as any).getLatLng()
                );
              }
            },
          }}
          draggable={true}
          position={destinationData?.geometry}
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
