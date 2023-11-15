import { EmptyState } from "../../pages/DriverDashboard";
import { TripResponse } from "../../utils/types";
import { useState } from "react";
import { OnGoingTripsModal } from "../modals/OngoingTripsModal";

export const OngoingTripsCard = ({ trips }: { trips: TripResponse[] }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<TripResponse | null>(null);

  return (
    <div
      style={{ overflowY: "scroll" }}
      className="card p-2 d-flex flex-column gap-1 h-100"
    >
      {trips.length > 0 ? (
        trips.map((trip, index) => (
          <div
            role="button"
            key={trip.id}
            onClick={() => {
              setSelectedTrip(trip);
              setOpenModal(true);
            }}
            className="card p-2 bg-white py-2 d-flex flex-row gap-1 align-items-center cursor-pointer"
          >
            <div>{index + 1}. </div>
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {trip.id}
            </div>
            <div className="d-flex gap-2">
              <i className="fa fa-circle-info" />
            </div>
          </div>
        ))
      ) : (
        <EmptyState text="No Ongoing Trips" />
      )}
      <OnGoingTripsModal
        open={openModal}
        trip={selectedTrip as TripResponse}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};
