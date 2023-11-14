import { Rating } from "../components/Rating";
import { useEffect, useState } from "react";
import useAuth from "../contexts/AuthProvider";
import { useUser } from "../hooks/useUser";
import {
  VEHICLE_SIZE_TYPES,
  apiEndpoints,
  defaultAvatarUrl,
  routes,
} from "../utils/constants";
import { driverResponse, serviceResponse, userResponse } from "../utils/types";
import { getXTData } from "../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../StateManagement/store";
import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

export const DriverDashboard = () => {
  const { token } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const maxWidth = 568;
  const [openNav, setOpenNav] = useState<boolean>(false);
  const services = useSelector((state: RootState) => state.services);

  const [driverServices, setDriverServices] = useState<serviceResponse[]>([]);

  useEffect(() => {
    getXTData(apiEndpoints.driver(token?.user.id as string))
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
  useEffect(() => {
    if (width && width > maxWidth) setOpenNav(true);
    else setOpenNav(false);
  }, [width]);
  return (
    <>
      {width && width < maxWidth && (
        <nav className="d-flex p-3 gap-2 bg-dark">
          <div className="float-left" onClick={() => setOpenNav(!openNav)}>
            <i className="color-light fa fa-bars fa-xl" aria-hidden="true"></i>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <Link to={routes.home}>
              <img className="m-auto" src="/logos/logo-no-icon.svg" />
            </Link>
          </div>
        </nav>
      )}
      <div className="d-flex h-100">
        {openNav && (
          <aside
            className={`bg-primary p-4 d-flex flex-column align-items-center gap-3 justify-content-between 
            ${width && width < maxWidth && "position-absolute w-100"}`}
            style={{
              zIndex: "100",
              inset: "0",
            }}
          >
            <span className="d-flex flex-column align-items-center gap-3">
              {width && width < maxWidth && (
                <div
                  style={{ position: "absolute", right: "1rem" }}
                  onClick={() => setOpenNav(false)}
                >
                  <i className="fa fa-x float-left" />
                </div>
              )}
              <Link to={routes.home}>
                <img src="/logos/logo-no-icon.svg" />
              </Link>
              <div className="profile__icon">
                <img
                  alt="profile"
                  src={defaultAvatarUrl}
                  className="profile__icon card-img"
                />
              </div>
              <div className="d-flex color-light flex-column ">
                <h6>
                  {token?.user?.first_name} {token?.user?.last_name}
                </h6>
                <h6>{token?.user.email}</h6>
                <h6>{token?.user.phonenumber}</h6>

                <Rating
                  className="color-light"
                  text={true}
                  value={token?.user?.ratings}
                />
                <a
                  href={routes.editUser}
                  className="bg-light color-dark btn btn-primary mt-3"
                >
                  <i className="fa-solid fa-pen" />
                  &nbsp; Edit Details
                </a>
              </div>
              <div className="w-100 color-dark">
                &larr; &nbsp;
                <a href="#" className="color-dark" onClick={() => navigate(-1)}>
                  <b>Go Back</b>
                </a>
              </div>
            </span>
            <i className="color-light">
              &copy;{new Date().getFullYear()} All rights reserved
            </i>
          </aside>
        )}

        <section
          style={{ maxHeight: "100vh", overflowY: "scroll" }}
          className="p-4 w-100 color-dark"
        >
          <h4>Welcome back {token?.user.first_name},</h4>
          <div className="row p-3">
            <article className="col-lg-4 col-md-4 col-sm-12 mb-3">
              <h5>Requests:</h5>
              <div className="card p-2 d-flex flex-column align-items-center">
                <EmptyState text="No Trip Requests" />
              </div>
            </article>
            <article className="col-lg-4 col-md-4 col-sm-12 mb-3">
              <h5>Complete Trips</h5>
              <div className="card p-2 d-flex flex-column align-items-center">
                <EmptyState text="No Complete trips yet" />
              </div>
            </article>
            <article className="col-lg-4 col-md-4 col-sm-12">
              <h5>Ongoing Trips</h5>
              <div className="card p-2 d-flex flex-column align-items-center">
                <EmptyState text="No Ongoing trips yet" />
              </div>
            </article>
            <article className="col-lg-4 col-md-4 col-sm-12 mt-5">
              <h5>Vehicle Details</h5>
              {user ? (
                <VehicleDetailsCard
                  user={user}
                  driverServices={driverServices}
                />
              ) : (
                <i className="fa fa-spinner" aria-hidden="true"></i>
              )}
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

function EmptyState({ text }: { text: string }) {
  return (
    <>
      <span style={{ width: "max-content" }}>
        <img src="/icons/empty-box.svg" />
      </span>
      <i className="color-gray text-center">{text}</i>
    </>
  );
}

function VehicleDetailsCard({
  user,
  driverServices,
}: {
  user: userResponse | driverResponse | null;
  driverServices: serviceResponse[];
}) {
  return (
    <div className="card p-2">
      <div className="card-body">
        <p className="card-text">
          <b>Truck Type: </b>
          <i className="color-secondary">
            {user &&
              "vehicle" in user &&
              VEHICLE_SIZE_TYPES[
                user?.vehicle?.vehicle_type as "A" | "B" | "C"
              ]}
          </i>
        </p>
        <p className="card-text">
          <b>Vehicle Model: </b>
          <i className="color-secondary">
            {user && "vehicle" in user && user?.vehicle?.make}
          </i>
        </p>
        <p className="card-text">
          <b>Registration: </b>
          <i className="color-secondary">
            {user && "vehicle" in user && user?.vehicle?.vehicle_registration}
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
