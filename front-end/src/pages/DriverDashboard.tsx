import { Rating } from "../components/Rating";
import { useEffect, useState } from "react";
import useAuth from "../contexts/AuthProvider";
import { useUser } from "../hooks/useUser";
import { apiEndpoints, defaultAvatarUrl, routes } from "../utils/constants";
import {
  TripResponse,
  driverResponse,
  serviceResponse,
  tripStatuses,
  userTypes,
} from "../utils/types";
import { capitalize, getXTData } from "../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../StateManagement/store";
import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { VehicleDetailsCard } from "../components/cards/VehicleDetailsCard";
import { TripRequestsCard } from "../components/cards/TripRequestsCard";
import { OngoingTripsCard } from "../components/cards/OnGoingTripsCard";
import { CompletedTripsCard } from "../components/cards/CompletedTripsCard";
import { UserRoleBadge } from "../components/badges/UserRoleBadge";
import { VehicleImagesCard } from "../components/cards/VehicleImagesCard";
import { Loader } from "../components/Loader";

export const DriverDashboard = () => {
  const services = useSelector((state: RootState) => state.services);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [trips, setTrips] = useState<TripResponse[] | []>([]); // TODO: replace with TripResponse[
  const { token } = useAuth();
  const { user } = useUser();
  const { width } = useWindowSize();
  const maxWidth = 568;

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

    getXTData(apiEndpoints.userTrips(token?.user.id as string))
      .then((data) => {
        setTrips(data as TripResponse[]);
        console.log(data);
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
            className={`bg-dark p-4 d-flex flex-column align-items-center gap-3 justify-content-between 
            ${width && width < maxWidth && "position-absolute w-100"}`}
            style={{
              zIndex: "100",
              inset: "0",
            }}
          >
            <div className="d-flex flex-column align-items-center gap-3">
              {width && width < maxWidth && (
                <div
                  style={{ position: "absolute", right: "1rem" }}
                  onClick={() => setOpenNav(false)}
                >
                  <i className="color-light fa fa-x float-left" />
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
            </div>
          </aside>
        )}

        <section
          style={{ maxHeight: "100vh", overflowY: "scroll" }}
          className="p-4 w-100 color-dark dashboard__container"
        >
          <h4>Welcome back {capitalize(token?.user.first_name as string)},</h4>
          <h5 className="ms-3">
            Role: <UserRoleBadge role={token?.user.role as userTypes} />
          </h5>
          <div className="row p-3">
            <article className="col-lg-4 col-md-4 h-100 col-sm-12 mb-3">
              <h5>Trip Requests:</h5>
              <TripRequestsCard
                trips={trips.filter(
                  (trip) => trip.status === tripStatuses.PENDING
                )}
              />
            </article>
            <article className="col-lg-4 col-md-4 h-100 col-sm-12 mb-3">
              <h5>Complete Trips:</h5>
              <CompletedTripsCard
                trips={trips.filter(
                  (trip) =>
                    trip.status === tripStatuses.FINISHED ||
                    trip.status === tripStatuses.CANCELLED
                )}
              />
            </article>
            <article className="col-lg-4 col-md-4 h-100 col-sm-12">
              <h5>Ongoing Trips:</h5>
              <OngoingTripsCard
                trips={trips.filter(
                  (trip) => trip.status === tripStatuses.ONGOING
                )}
              />
            </article>
            <article className="col-lg-4 col-md-4 h-100 col-sm-12 mt-5">
              <h5>Vehicle Details:</h5>
              {driverServices ? (
                <VehicleDetailsCard
                  driver={user as driverResponse}
                  driverServices={driverServices}
                />
              ) : (
                <Loader />
              )}
            </article>
            <article className="col-lg-4 col-md-4 h-100 col-sm-12 mt-5">
              <h5>Vehicle Images:</h5>
              <VehicleImagesCard driver={user as driverResponse} />
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <span style={{ width: "max-content" }}>
        <img src="/icons/empty-box.svg" />
      </span>
      <i className="color-gray text-center">{text}</i>
    </div>
  );
}
