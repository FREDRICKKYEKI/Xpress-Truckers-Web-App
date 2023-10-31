import React, { useEffect, useState } from "react";
import { envs } from "../utils/loadEnv";
import {
  setDestination,
  setCurrentLocation,
  setPromiseState,
} from "../StateManagement/store";
import { useDispatch, useSelector } from "react-redux";
import { DriverRequest } from "../utils/DataModels";
import { toast } from "react-toastify";
import {
  VEHICLE_TYPES,
  geoSearch,
  locationTypes,
  promiseStates,
} from "../utils/utils";
import { useWindowSize } from "@uidotdev/usehooks";

export const TruckRequestForm = ({ originRef, destinationRef }) => {
  const { _, width } = useWindowSize();
  const [openMenu, setOpenMenu] = useState(true);
  const dispatch = useDispatch();
  const [locations, setLocations] = useState({
    originsResponses: null,
    destinationsResponses: null,
  });
  const currentLocation = useSelector((state) => state.currentLocation);
  const destination = useSelector((state) => state.destination);

  /**
   * Stores the location data in the Redux store based on the location type.
   * @param {string} locationType - The type of location (origin or destination).
   * @param {Object} data - The location data to be stored.
   * @param {string} origin - The origin of the location data.
   */
  function storeLocation(locationType, data) {
    if (!data) return;
    if (locationType === locationTypes.ORIGIN) {
      dispatch(setCurrentLocation(data));
    } else {
      dispatch(setDestination(data));
    }
  }

  function fetchLocations(locationType, e) {
    const text = e.target.value;
    if (text.length < 3) return;

    geoSearch(text)
      .then((data) => {
        dispatch(setPromiseState(promiseStates.FULFILLED, "location found"));
        if (locationType === locationTypes.ORIGIN) {
          setLocations((prev) => ({ ...prev, originsResponses: data.results }));
        } else {
          setLocations((prev) => ({
            ...prev,
            destinationsResponses: data.results,
          }));
        }
      })
      .catch((error) => {
        dispatch(setPromiseState(promiseStates.REJECTED, error.message));
      });
  }

  function requestTruck(e) {
    e.preventDefault();
    const from = currentLocation;
    const to = destination;
    const vehicleType = document.getElementById("v-type").value;
    const services = document.querySelectorAll("[data-role=service]");
    const servicesArray = [];

    services.forEach((service) => {
      if (service.checked) {
        servicesArray.push(service.value);
      }
    });

    const request = new DriverRequest(from, to, vehicleType, servicesArray);

    try {
      if (request.isValid()) {
        console.log(request.toRequest());
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  useEffect(() => {
    if (width > 499) {
      try {
        document.getElementById("truck-request-form").style.height =
          "max-content";
      } catch (e) {}
    }
  }, [width]);
  return (
    <>
      <form
        style={{
          overflow: "hidden",
          height: `${openMenu ? "450px" : "250px"}`,
        }}
        onSubmit={requestTruck}
        id="truck-request-form"
        className="truck-request-form"
      >
        {width < 499 && (
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="float-end px-1"
          >
            <i
              className={`fas fa-lg fa-angle-${
                openMenu ? "down" : "up"
              } color-dark`}
            ></i>
          </div>
        )}
        <h5 className="text-center">Search For Truck</h5>

        <div className="form-group mb-1">
          <label htmlFor="input-datalist">Where are you now?</label>
          <input
            ref={originRef}
            required
            onInput={(e) => fetchLocations(locationTypes.ORIGIN, e)}
            onFocus={() =>
              toast.loading("Searching...", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: true,
              })
            }
            onBlur={() => {
              toast.dismiss();
              storeLocation(
                locationTypes.ORIGIN,
                locations.originsResponses?.length == 1
                  ? locations.originsResponses[0]
                  : null
              );
            }}
            type="text"
            placeholder={"e.g Nairobi, Eldoret"}
            className="form-control"
            list="list-origin"
            id="input-origin"
          />
          <datalist id="list-origin">
            {locations.originsResponses?.map((place, index) => (
              <option key={index}>{place.formatted}</option>
            ))}
          </datalist>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="input-datalist">Destination:</label>
          <input
            required
            onInput={(e) => fetchLocations(locationTypes.DESTINATION, e)}
            onFocus={() =>
              toast.loading("Searching...", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: true,
              })
            }
            onBlur={() => {
              toast.dismiss();
              storeLocation(
                locationTypes.DESTINATION,
                locations.destinationsResponses?.length == 1
                  ? locations.destinationsResponses[0]
                  : null
              );
            }}
            type="text"
            className="form-control"
            placeholder={"e.g Nairobi, Eldoret"}
            list="list-destination"
            ref={destinationRef}
            id="input-destination"
          />
          <datalist id="list-destination">
            {locations.destinationsResponses?.map((place, index) => (
              <option key={index}>{place?.formatted}</option>
            ))}
          </datalist>
        </div>

        <div className="input-group mb-2 justify-content-between">
          <label className="form-check-label fs-6" htmlFor="v-type">
            Vehicle Type:
          </label>
          <select
            defaultValue={"null"}
            id="v-type"
            className="custom-select p-2 w-100"
          >
            <option value={"null"}>Choose...</option>
            {VEHICLE_TYPES.map((type, index) => (
              <option key={type.id} value={type.type}>
                {type.name}
              </option>
            ))}
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
          Search For Trucks
        </button>
      </form>
    </>
  );
};
