import React, { useEffect, useRef, useState } from "react";
import { MapBG } from "../components/MapBG";
import { setCurrentLocation, setPromiseState } from "../StateManagement/store";
import { useDispatch } from "react-redux";
import { TruckRequestForm } from "../components/TruckRequestForm";
import { locationTypes, promiseStates } from "../utils/constants";
import { getCurrentLocation, getLocationData } from "../utils/utils";
import { LocationDataResponse } from "../utils/DataModels";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    dispatch(
      setPromiseState(promiseStates.PENDING, "Getting current location")
    );

    getCurrentLocation()
      .then((location) => {
        getLocationData({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
          .then((data) => {
            dispatch(
              setPromiseState(
                promiseStates.FULFILLED,
                "Current Location Data found"
              )
            );

            const location = new LocationDataResponse(data.results[0]);
            try {
              if (location.isValid()) {
                dispatch(setCurrentLocation(location.toObject()));
                document.querySelector("#input-origin").value =
                  location.toObject().formatted;
              }
            } catch (e) {
              toast.dismiss();
              dispatch(setPromiseState(promiseStates.REJECTED, e.message));
            }
          })
          .catch((error) => {
            dispatch(setPromiseState(promiseStates.REJECTED));
            console.error(error);
          });
      })
      .catch((error) => {
        dispatch(
          setPromiseState(promiseStates.REJECTED, "Location not found!")
        );
        console.error(error);
      });
  }, []);

  return (
    <>
      <MapBG
        originRef={originRef}
        destinationRef={destinationRef}
        locationTypes={locationTypes}
      />
      <TruckRequestForm
        originRef={originRef}
        destinationRef={destinationRef}
        locationTypes={locationTypes}
      />
    </>
  );
};

export default Home;
