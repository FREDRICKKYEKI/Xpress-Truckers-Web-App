import { useEffect, useState } from "react";
import "../styles/profile.css";
import {
  VEHICLE_SIZE_TYPES,
  apiEndpoints,
  defaultAvatarUrl,
} from "../utils/constants";
import { getUnsplashPhotos, getXTData } from "../utils/utils";
import { Rating } from "../components/Rating";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { driverResponse, serviceResponse } from "../utils/types";
import { RootState } from "../StateManagement/store";

const Driver = () => {
  const params = useParams();
  const [sampleTrucks, setSampleTrucks] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [driver, setDriver] = useState<driverResponse | null>(null);
  const services = useSelector((state: RootState) => state.services);
  const [driverServices, setDriverServices] = useState<serviceResponse[]>([]);

  useEffect(() => {
    getXTData(apiEndpoints.driver(params.id))
      .then((driverRes: unknown) => {
        let driverResponse = driverRes as driverResponse;
        setDriver(driverResponse);

        if (services) {
          let drivServices: { [key: string]: any } = {};

          for (const service of driverResponse.services) {
            drivServices[service.service_id.trim()] =
              services[service.service_id.trim()];
          }
          setDriverServices(Object.values(drivServices));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (driver?.vehicle?.vehicle_type) {
      const vehicleType =
        VEHICLE_SIZE_TYPES[driver?.vehicle?.vehicle_type as "A" | "B" | "C"];
      getUnsplashPhotos({ query: vehicleType })
        .then((data) => {
          setSampleTrucks(data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [driver]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="container color-dark">
      <div className="row">
        {/* Driver profile*/}
        <div
          style={{ border: "none" }}
          className="col-lg-4 mx-auto col-md-4 col-sm-12 profile__card card mobile_profile__card"
        >
          <div className="profile__header">
            <h2 className="profile__header__title ">Truck Driver</h2>
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
            <Rating text={true} value={driver?.ratings} />
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
          <button className="btn btn-secondary w-100">
            <i className="fa-solid fa-phone mx-2" />
            call
          </button>
        </div>
        {/* Driver Details */}
        <div
          // className="driver-details__card card"
          className="col-lg-4 col-md-4 col-sm-12 driver-details__card card mx-auto"
        >
          <div className="">
            <h5>
              <u>Details:</u>
            </h5>
          </div>
          <div className="card-body">
            <p className="card-text">
              <b>Truck Type: </b>
              <i className="color-secondary">
                {driver &&
                  VEHICLE_SIZE_TYPES[
                    driver?.vehicle?.vehicle_type as "A" | "B" | "C"
                  ]}
              </i>
            </p>
            <p className="card-text">
              <b>Vehicle Model: </b>
              <i className="color-secondary">{driver?.vehicle?.make}</i>
            </p>
            <p className="card-text">
              <b>Registration: </b>
              <i className="color-secondary">
                {driver?.vehicle?.vehicle_registration}
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
        {/* Vehicles */}
        <div
          className="vehicle__card card mx-auto w-100 h-100 col-lg-4 col-md-4 col-sm-12"

          //  className="vehicle__card card mb-3"
        >
          <h5>
            <u>Vehicle:</u>
          </h5>
          <div className="vehicle_imgs">
            {sampleTrucks?.map((result: any) => (
              <div key={result?.id}>
                <img alt="vehicle" src={result.urls.regular} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Driver;