import { Rating } from "./Rating";
import { defaultAvatarUrl, routes } from "../utils/constants";
import { driverResponse, locationData } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { RootState } from "../StateManagement/store";
import { useSelector } from "react-redux";
import { LocationDataResponse } from "../utils/DataModels";
import { toast } from "react-toastify";

export const DriverPopUp = ({ driver }: { driver: driverResponse }) => {
  const state = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  function navigateToDriver() {
    const origin = new LocationDataResponse(state.currentLocation);
    const destination = new LocationDataResponse(
      state.destination as locationData
    );

    try {
      if (origin.isValid() && destination.isValid()) {
        navigate(routes.driver(driver?.id));
      }
    } catch (error) {
      toast.error("Please select a valid origin and destination...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  }

  return (
    <div style={{ border: "none" }} className="card">
      <div className="profile__icon">
        <img alt="profile" src={defaultAvatarUrl} className="card-img" />
      </div>
      <div className="profile__card__body card-body">
        <h5 className="card-title">
          {driver?.first_name} {driver?.last_name}
        </h5>

        <p className="card-text"></p>
        <Rating
          className="color-dark font-weight-bold"
          text={true}
          value={driver?.ratings || 0}
        />

        <p className="card-text">
          <b>
            Status: <span className="color-secondary">Available</span>
          </b>
        </p>
      </div>
      <a
        onClick={() => navigateToDriver()}
        href="#"
        className="btn btn-secondary color-light mt-2 w-100"
      >
        More info
      </a>
    </div>
  );
};
