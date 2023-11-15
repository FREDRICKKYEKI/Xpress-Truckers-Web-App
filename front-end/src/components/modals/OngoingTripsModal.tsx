import {
  TripResponse,
  driverResponse,
  locationData,
  tripStatuses,
  userResponse,
} from "../../utils/types";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import { getLocationData, getXTData, putXTData } from "../../utils/utils";
import { apiEndpoints } from "../../utils/constants";
import { toast } from "react-toastify";
import { TripStatusBadge } from "../badges/TripStatusBadge";
import { Loader } from "../Loader";

export const type1Text = "You requested a truck.";

export const OnGoingTripsModal = ({
  trip,
  open,
  onClose,
}: {
  trip: TripResponse;
  open: boolean;
  onClose: () => void;
}) => {
  const [origin, setOrigin] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (trip) {
      getLocationData(JSON.parse(trip.origin.replace(/'/g, '"')))
        .then((data) => {
          setOrigin((data as any).results[0]);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });

      getXTData(
        trip?.type === "type1"
          ? apiEndpoints.driver(trip?.driver_id)
          : apiEndpoints.user(trip?.client_id)
      )
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

      getLocationData(JSON.parse(trip.destination.replace(/'/g, '"')))
        .then((data) => {
          setLoading(false);
          setDestination((data as any).results[0]);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [trip]);

  function handleFinishTrip() {
    if (!trip) return;
    toast.promise(
      putXTData(apiEndpoints.trip(trip?.id), {
        status: tripStatuses.FINISHED,
      })
        .then(() => {
          window.location.reload();
          onClose();
        })
        .catch((error) => {
          console.log(error);
        }),
      {
        pending: "Please wait...",
        success: "Trip finished!",
        error: "Something went wrong!",
      }
    );
  }

  function handleCancelTrip() {
    if (!trip) return;
    toast.promise(
      putXTData(apiEndpoints.trip(trip?.id), {
        status: tripStatuses.CANCELLED,
      })
        .then(() => {
          window.location.reload();
          onClose();
        })
        .catch((error) => {
          console.log(error);
        }),
      {
        pending: "Please wait...",
        success: "Trip cancelled!",
        error: "Something went wrong!",
      }
    );
  }

  return (
    <Modal
      classNames={{ root: "rounded" }}
      open={open}
      onClose={onClose}
      center
    >
      <div className="container d-flex flex-column mt-3">
        <h3>Trip Details:</h3>
        {trip?.type === "type1" && <p>{type1Text}</p>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>
              <b>Trip id</b>: <b className="color-primary">{trip?.id}</b>
            </div>
            <div>
              <b>Requested on</b>: {new Date(trip?.created_at).toUTCString()}
            </div>
            <div>
              <b>Started On:</b>{" "}
              {new Date(trip?.start_at).toUTCString() || "not yet"}
            </div>

            <div>
              <b>From</b>: {(origin as locationData)?.formatted}
            </div>
            <div>
              <b>To</b>: {(destination as locationData)?.formatted}
            </div>

            <h5 className="mt-3">
              {trip?.type === "type1" ? "Driver" : "Client"} Details:
            </h5>
            <div>
              <b>Name</b>: {(user as driverResponse | userResponse)?.first_name}{" "}
              {(user as driverResponse | userResponse)?.last_name}
            </div>
            <div>
              <b>Phone</b>:
              <a
                className="color-secondary"
                href={`tel: ${
                  (user as driverResponse | userResponse)?.phonenumber
                }`}
              >
                {" "}
                {(user as driverResponse)?.phonenumber}
              </a>
            </div>

            <div className="mt-1">
              <b>Status</b>:{" "}
              <TripStatusBadge status={trip?.status as tripStatuses} />
            </div>
            {trip?.type === "type1" ? (
              <button
                onClick={handleCancelTrip}
                className="btn btn-danger w-100 mt-3"
              >
                Cancel Trip
              </button>
            ) : (
              <div className="row mt-2">
                <div className="col-6">
                  <button
                    onClick={handleFinishTrip}
                    className="btn w-100 btn-success"
                  >
                    Finish Trip
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={handleCancelTrip}
                    className="btn w-100 btn-danger"
                  >
                    Cancel Trip
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
