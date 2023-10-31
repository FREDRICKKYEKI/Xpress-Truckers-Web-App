import React from "react";
import { Rating } from "./Rating";
import { SERVICES, VEHICLE_TYPES, defaultAvatarUrl } from "../utils/utils";

export const DriverPopUp = () => {
  return (
    <div style={{ border: "none" }} className="card">
      <div className="profile__icon">
        <img alt="profile" src={defaultAvatarUrl} className="card-img" />
      </div>
      <div className="profile__card__body card-body">
        <h5 className="card-title">John Doe</h5>

        <p className="card-text"></p>
        <Rating text={true} value={2.5} />

        <p className="card-text">
          <b>
            Status: <span className="color-secondary">Available</span>
          </b>
        </p>
      </div>
      <button className="btn btn-secondary bg-primary mt-2 w-100">
        More info
      </button>
    </div>
  );
};
