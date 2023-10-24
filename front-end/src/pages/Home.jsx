import React, { useEffect, useState } from "react";
import { MapBG } from "../components/MapBG";
import { setCurrentLocation, setIsLoading } from "../StateManagement/store";
import { useDispatch } from "react-redux";
import { TruckRequestForm } from "../components/TruckRequestForm";
import {
  getCurrentLocation,
  getLocationData,
  locationTypes,
} from "../utils/utils";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));

    getCurrentLocation()
      .then((location) => {
        getLocationData({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
          .then((data) => {
            dispatch(setIsLoading(false));
            console.log(data);
          })
          .then((error) => {
            dispatch(setIsLoading(false));
            console.error(error);
          });
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        console.error(error);
      });
  }, []);

  return (
    <>
      <MapBG locationTypes={locationTypes} />
      <TruckRequestForm locationTypes={locationTypes} />
    </>
  );
};

export default Home;
