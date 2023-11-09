import { ChangeEvent, useEffect, useState } from "react";
import {
  setDestination,
  setCurrentLocation,
  setPromiseState,
  RootState,
  setDrivers,
} from "../StateManagement/store";
import { VEHICLE_TYPES, apiEndpoints } from "../utils/constants";
import { geoSearch, postXTData } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { DriverRequest } from "../utils/DataModels";
import { toast } from "react-toastify";
import { useWindowSize } from "@uidotdev/usehooks";
import { locationTypes, promiseStates, vehicleTypes } from "../utils/types";

export const TruckRequestForm = ({
  originRef,
  destinationRef,
}: {
  originRef: any;
  destinationRef: any;
}) => {
  const { width } = useWindowSize();
  const [openMenu, setOpenMenu] = useState(true);
  const dispatch = useDispatch();
  const [locations, setLocations] = useState<any>({
    originsResponses: null,
    destinationsResponses: null,
  });
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  );
  const destination = useSelector((state: RootState) => state.destination);

  /**
   * Stores the location data in the Redux store based on the location type.
   * @param {string} locationType - The type of location (origin or destination).
   * @param {Object} data - The location data to be stored.
   */
  function storeLocation(locationType: locationTypes, data: any) {
    if (!data) return;
    if (locationType === locationTypes.ORIGIN) {
      dispatch(setCurrentLocation(data));
    } else {
      dispatch(setDestination(data));
    }
  }

  /**
   * Fetches locations based on the provided location type and input value.
   * @param locationType - The type of location to fetch (origin or destination).
   * @param e - The input change event.
   */
  function fetchLocations(
    locationType: locationTypes,
    e: ChangeEvent<HTMLInputElement>
  ) {
    const target = e.target;
    if (!target) return;
    const text = (target as HTMLInputElement)?.value;
    if (text.length < 3) return;

    geoSearch(text)
      .then((data: any) => {
        dispatch(setPromiseState(promiseStates.FULFILLED, "location found"));
        if (locationType === locationTypes.ORIGIN) {
          setLocations((prev: any) => ({
            ...prev,
            originsResponses: data.results,
          }));
        } else {
          setLocations((prev: any) => ({
            ...prev,
            destinationsResponses: data.results,
          }));
        }
      })
      .catch((error) => {
        dispatch(setPromiseState(promiseStates.REJECTED, error.message));
      });
  }

  function requestTruck(e: Event) {
    e.preventDefault();
    toast.loading("Fetching trucks...", {
      position: toast.POSITION.TOP_CENTER,
      closeButton: true,
    });
    const from = currentLocation;
    const to = destination || {};
    const vehicleType_ =
      ((document.getElementById("v-type") as HTMLInputElement)
        ?.value as vehicleTypes) || "A";
    const services = document.querySelectorAll<HTMLInputElement>(
      "[data-role=service]"
    );
    const servicesArray: string[] = [];

    services.forEach((service) => {
      if (service.checked) {
        servicesArray.push(service.value);
      }
    });

    const request = new DriverRequest(from, to, [vehicleType_], servicesArray);

    try {
      if (request.isValid()) {
        postXTData(apiEndpoints.filteredDrivers, request.toObject())
          .then((response) => {
            toast.dismiss();
            toast.success("Trucks fetched successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 500,
            });
            dispatch(setDrivers(response));
          })
          .catch((error) => {
            console.log(error);
            toast.dismiss();
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  useEffect(() => {
    if (width && width > 499) {
      try {
        const truckRequestForm = document.getElementById("truck-request-form");
        if (truckRequestForm) {
          truckRequestForm.style.height = "max-content";
        }
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
        onSubmit={(e: any) => requestTruck(e)}
        id="truck-request-form"
        className="truck-request-form"
      >
        {width && width < 499 && (
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
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              fetchLocations(locationTypes.ORIGIN, e)
            }
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
            {locations.originsResponses?.map((place: any, index: any) => (
              <option key={index}>{place.formatted}</option>
            ))}
          </datalist>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="input-datalist">Destination:</label>
          <input
            required
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              fetchLocations(locationTypes.DESTINATION, e)
            }
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
            {locations.destinationsResponses?.map((place: any, index: any) => (
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
            {VEHICLE_TYPES.map((type) => (
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
