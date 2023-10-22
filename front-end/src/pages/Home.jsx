import React, { useEffect, useState } from "react";
import { MapBG } from "../components/MapBG";
import { setCurrentLocation } from "../StateManagement/store";
import { useDispatch } from "react-redux";
import { TruckRequestForm } from "../components/TruckRequestForm";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator?.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        dispatch(
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      },
      (error) => {
        setLoading(false);
        if (error.code === 1) {
          console.log("Geolocation permission denied by the user.");
        } else {
          console.error("Geolocation error:", error);
        }
      }
    );
  }, []);

  return (
    <>
      <MapBG loading={loading} />
      <TruckRequestForm />
    </>
  );
};

export default Home;
