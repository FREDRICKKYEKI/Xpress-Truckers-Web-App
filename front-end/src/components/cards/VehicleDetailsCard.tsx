import { VEHICLE_SIZE_TYPES } from "../../utils/constants";
import { driverResponse, serviceResponse } from "../../utils/types";

export function VehicleDetailsCard({
  driver,
  driverServices,
}: {
  driver: driverResponse;
  driverServices: serviceResponse[];
}) {
  return (
    <div className="card p-2 driver-details__card">
      <div className="card-body">
        <p className="card-text">
          <b>Truck Type: </b>
          <i className="color-secondary">
            {driver &&
              "vehicle" in driver &&
              VEHICLE_SIZE_TYPES[
                driver?.vehicle?.vehicle_type as "A" | "B" | "C"
              ]}
          </i>
        </p>
        <p className="card-text">
          <b>Vehicle Model: </b>
          <i className="color-secondary">
            {driver && "vehicle" in driver && driver?.vehicle?.make}
          </i>
        </p>
        <p className="card-text">
          <b>Registration: </b>
          <i className="color-secondary">
            {driver &&
              "vehicle" in driver &&
              driver?.vehicle?.vehicle_registration}
          </i>
        </p>
        <p className="card-text font-weight-bold">
          <b>Operates in: </b>
          <i className="color-secondary"> Nairobi, Kenya</i>
        </p>
        <p className="card-text">
          <b>Services Offered: </b>
        </p>
        <div className="driver-details__footer py-2 text-start">
          <ul>
            {driverServices?.map((service) => (
              <li key={service?.id}>{service?.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
