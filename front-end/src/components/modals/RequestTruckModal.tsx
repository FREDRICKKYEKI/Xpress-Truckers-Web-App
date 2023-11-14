import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { postXTData } from "../../utils/utils";
import { apiEndpoints } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../StateManagement/store";
import { TripPostRequest, driverResponse, latlng } from "../../utils/types";
import useAuth from "../../contexts/AuthProvider";
import { useState } from "react";
import { toast } from "react-toastify";

export function RequestTruckModal({
  open,
  onClose,
  driver,
}: {
  open: boolean;
  onClose: () => void;
  driver: driverResponse;
}) {
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  );
  const destination = useSelector((state: RootState) => state.destination);
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  function handleRequestTruck() {
    setLoading(true);
    let trip: TripPostRequest;
    trip = {
      client_id: token?.user.id as string,
      driver_id: driver?.id,
      vehicle_id: driver.vehicle.id,
      origin: currentLocation?.geometry,
      destination: destination?.geometry as latlng,
      status: "pending",
    };
    toast.promise(
      postXTData(apiEndpoints.trips, trip)
        .then((res) => {
          setLoading(false);
          console.log(res);
          onClose();
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        }),
      {
        pending: "Requesting truck...",
        success: "Trip started!",
        error: "Request failed!",
      }
    );
  }

  return (
    <Modal open={open} onClose={onClose} center>
      <div className="container">
        <h4>Request Truck:</h4>
        <p>Do you wish to start the trip ?</p>
        <div className="row">
          <div className="col-6">
            <button
              disabled={loading}
              onClick={handleRequestTruck}
              className="w-100 bg-dark btn btn-success m-auto"
            >
              {loading ? "Requesting..." : "Yes"}
            </button>
          </div>
          <div className="col-6">
            <button onClick={() => onClose()} className="w-100 btn btn-danger">
              No
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
