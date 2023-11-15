import {
  TripResponse,
  driverResponse,
  locationData,
  tripStatuses,
  userResponse,
} from "../../utils/types";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import { deleteXTData, getLocationData, getXTData } from "../../utils/utils";
import { apiEndpoints } from "../../utils/constants";
import { toast } from "react-toastify";

export const type1Text = "You requested a truck.";

export const CompletedTripsModal = ({
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

  function handleDeleteTrip() {
    if (!trip) return;
    toast.promise(
      deleteXTData(apiEndpoints.trip(trip?.id))
        .then(() => {
          window.location.reload();
          onClose();
        })
        .catch((error) => {
          console.log(error);
        }),
      {
        pending: "Please wait...",
        success: "Trip Deleted!",
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
          <i className="fa fa-spinner" aria-hidden="true"></i>
        ) : (
          <>
            <div>
              <b>Trip id</b>: <b className="color-primary">{trip?.id}</b>
            </div>
            <div>
              <b>Requested on</b>: {new Date(trip?.created_at).toDateString()}
            </div>
            <div>
              <b>Started On:</b>{" "}
              {new Date(trip?.start_at).toDateString() || "not yet"}
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
              <span className="bg-gray p-1 rounded color-dark">
                {trip?.status}
              </span>
            </div>
            {trip?.type === "type1" &&
              trip?.status === tripStatuses.CANCELLED && (
                <button
                  onClick={handleDeleteTrip}
                  className="btn btn-danger w-100 mt-3"
                >
                  Delete Trip
                </button>
              )}
          </>
        )}
      </div>
    </Modal>
  );
};
