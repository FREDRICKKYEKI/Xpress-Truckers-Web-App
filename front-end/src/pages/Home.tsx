import { useEffect, useRef } from "react";
import { MapBG } from "../components/MapBG";
import { setCurrentLocation, setPromiseState } from "../StateManagement/store";
import { useDispatch } from "react-redux";
import { TruckRequestForm } from "../components/TruckRequestForm";
import { promiseStates } from "../utils/types";
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
          .then((data: any) => {
            dispatch(
              setPromiseState(
                promiseStates.FULFILLED,
                "Current Location Data found"
              )
            );

            try {
              const location = new LocationDataResponse(data.results[0]);
              if (location.isValid()) {
                dispatch(setCurrentLocation(location.toObject()));
                const inputOrigin =
                  document.querySelector<HTMLInputElement>("#input-origin");
                if (inputOrigin) {
                  inputOrigin.value = location.getShortName();
                }
              }
            } catch (err: any) {
              console.error(err);
              if (err) {
                toast.dismiss();
                dispatch(setPromiseState(promiseStates.REJECTED, err.message));
              }
              toast.dismiss();
              dispatch(setPromiseState(promiseStates.REJECTED, err.message));
            }
          })
          .catch((error) => {
            dispatch(setPromiseState(promiseStates.REJECTED));
            console.error(error);
          });
      })
      .catch((error) => {
        dispatch(
          setPromiseState(promiseStates.REJECTED, "Please enable location")
        );
        console.error(error);
      });
  }, []);

  return (
    <>
      <MapBG originRef={originRef} destinationRef={destinationRef} />
      <TruckRequestForm originRef={originRef} destinationRef={destinationRef} />
    </>
  );
};

export default Home;
