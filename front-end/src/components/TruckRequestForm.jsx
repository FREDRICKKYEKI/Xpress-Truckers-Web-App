import React, { useState } from "react";
import { envs } from "../utils/loadEnv";
import {
  setDestination,
  setCurrentLocation,
  setIsLoading,
} from "../StateManagement/store";
import { useDispatch } from "react-redux";
import { DriverRequest } from "../utils/DataModels";
import { toast } from "react-toastify";

export const TruckRequestForm = ({ locationTypes }) => {
  const dispatch = useDispatch();

  const [locations, setLocations] = useState({
    originsResponses: null,
    destinationsResponses: null,
  });

  function storeLocation(locationType, data) {
    if (!data) return;
    toast.dismiss();
    if (locationType === locationTypes.ORIGIN) {
      dispatch(setCurrentLocation(data || null));
    } else {
      dispatch(setDestination(data || null));
    }
  }

  function fetchLocations(e) {
    const text = e.target.value;
    if (text.length < 3) return;
    dispatch(setIsLoading(true));
    fetch(`https://api.opencagedata.com/geosearch?q=${text}`, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "opencage-geosearch-key": `${envs.openCageApiKey}`,
        Referer: "https://opencagedata.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setIsLoading(false));
        if (e.target.id === "input-datalist-origin") {
          setLocations((prev) => ({ ...prev, originsResponses: data }));
        } else {
          setLocations((prev) => ({ ...prev, destinationsResponses: data }));
        }
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
      });
  }

  function requestTruck(e) {
    e.preventDefault();
    const origin = locations.originsResponses?.results[0];
    const destination = locations.destinationsResponses?.results[0];
    const vehicleType = document.getElementById("v-type").value;
    const services = document.querySelectorAll("[data-role=service]");
    const servicesArray = [];
    services.forEach((service) => {
      if (service.checked) {
        servicesArray.push(service.value);
      }
    });
    const request = new DriverRequest(
      origin,
      destination,
      vehicleType,
      servicesArray
    );
    try {
      if (request.isValid()) {
        console.log("is valid", request);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      <form onSubmit={requestTruck} className="truck-request-form">
        <h5 className="text-center">Search For Truck</h5>

        <div className="form-group mb-1">
          <label htmlFor="input-datalist">Where are you now?</label>
          <input
            onInput={(e) => fetchLocations(e)}
            onBlur={storeLocation(
              locationTypes.ORIGIN,
              locations.originsResponses?.results.length == 1
                ? locations.originsResponses?.results[0]
                : null
            )}
            type="text"
            className="form-control"
            placeholder="e.g Nairobi, Eldoret"
            list="list-origin"
            id="input-datalist-origin"
          />
          <datalist id="list-origin">
            {locations.originsResponses?.results.map((place, index) => (
              <option key={index}>{place.formatted}</option>
            ))}
          </datalist>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="input-datalist">Destination:</label>
          <input
            onInput={(e) => fetchLocations(e)}
            onBlur={storeLocation(
              locationTypes.DESTINATION,
              locations.destinationsResponses?.results.length == 1
                ? locations.destinationsResponses?.results[0]
                : null
            )}
            type="text"
            className="form-control"
            placeholder="e.g Nairobi, Eldoret"
            list="list-destination"
            id="input-datalist-destination"
          />
          <datalist id="list-destination">
            {locations.destinationsResponses?.results.map((place, index) => (
              <option key={index}>{place.formatted}</option>
            ))}
          </datalist>
        </div>

        <div className="input-group mb-2 justify-content-between">
          <label className="form-check-label fs-6" htmlFor="services">
            Vehicle Type:
          </label>
          <select
            defaultValue={"null"}
            id="v-type"
            className="custom-select p-2 w-100"
          >
            <option value={"null"}>Choose...</option>
            <option value={"A"}>Pickup (small)</option>
            <option value={"B"}>Lorry (medium)</option>
            <option value={"C"}>Truck (Large)</option>
          </select>
        </div>

        <label className="" htmlFor="services">
          Choose a service:
        </label>
        <div id="services" className="mb-0 form-check">
          <label className="form-check-label" htmlFor="service1">
            <input
              data-role="service"
              type="checkbox"
              className="form-check-input"
              id="service1"
              value={"A"}
            />
            Moving out
          </label>
        </div>
        <div className="mb-0 form-check">
          <label className="form-check-label" htmlFor="service2">
            <input
              data-role="service"
              type="checkbox"
              className="form-check-input"
              id="service2"
              value={"B"}
            />
            Transport Construction Materials
          </label>
        </div>
        <div className="mb-0 form-check">
          <label className="form-check-label" htmlFor="service3">
            <input
              data-role="service"
              type="checkbox"
              className="form-check-input"
              id="service3"
              value={"C"}
            />
            Transport Farm Produce
          </label>
        </div>
        <div className="mb-2 form-check">
          <label className="form-check-label" htmlFor="service4">
            <input
              data-role="service"
              type="checkbox"
              className="form-check-input"
              id="service4"
              value={"D"}
            />
            Long Distance Transportation
          </label>
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Request Truck
        </button>
      </form>
    </>
  );
};
