import { useEffect, useState } from "react";
import "../styles/profile.css";
import { apiEndpoints, defaultAvatarUrl } from "../utils/constants";
import { getXTData } from "../utils/utils";
import { Rating } from "../components/Rating";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { driverResponse, serviceResponse } from "../utils/types";
import { RootState } from "../StateManagement/store";
import { useUser } from "../hooks/useUser";
import { VehicleImagesCard } from "../components/cards/VehicleImagesCard";
import { VehicleDetailsCard } from "../components/cards/VehicleDetailsCard";
import { RequestTruckModal } from "../components/modals/RequestTruckModal";

const Driver = () => {
  const params = useParams();
  const { user } = useUser();
  const driver = user as driverResponse;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const services = useSelector((state: RootState) => state.services);
  const [driverServices, setDriverServices] = useState<serviceResponse[]>([]);

  useEffect(() => {
    getXTData(apiEndpoints.driver(params.id))
      .then((driverRes: unknown) => {
        let driverResponse = driverRes as driverResponse;

        if (services) {
          let drivServices: { [key: string]: any } = {};

          for (const service of driverResponse.services) {
            drivServices[service.service_id.trim()] =
              services[service.service_id.trim()];
          }
          setDriverServices(Object.values(drivServices));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="container color-dark">
      <div className="row p-3">
        <div className="col-lg-4 mx-auto col-md-4 col-sm-12 profile__card card mobile_profile__card">
          <div className="profile__header">
            <h3 className="profile__header__title ">Truck Driver</h3>
          </div>
          <div className="profile__icon">
            <img
              alt="profile"
              src={defaultAvatarUrl}
              className="profile__icon card-img"
            />
          </div>
          <div className="profile__card__body card-body">
            <h5 className="card-title">
              {driver?.first_name} {driver?.last_name}
            </h5>
            <p className="card-text"></p>
            <Rating
              className="color-dark font-weight-bold"
              text={true}
              value={driver?.ratings}
            />
            <p className="card-text">
              <>
                <b>Email:&nbsp;</b>
                {driver?.email}
              </>
            </p>
            <p className="card-text">
              <b>Contact: </b>
              {driver?.phonenumber}
            </p>
            <p className="card-text">
              <b>
                Status: <span className="color-secondary">Available</span>
              </b>
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-secondary w-100"
          >
            <i className="fa-solid fa-phone mx-2" />
            Request Truck
          </button>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12  mx-auto">
          <VehicleDetailsCard
            driver={user as driverResponse}
            driverServices={driverServices}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 mx-auto">
          <VehicleImagesCard driver={driver} />
        </div>
      </div>
      <RequestTruckModal open={openModal} onClose={() => setOpenModal(false)} />
    </section>
  );
};

export default Driver;
