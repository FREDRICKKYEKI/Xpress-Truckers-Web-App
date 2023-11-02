import React from "react";
import { Rating } from "./Rating";
import { defaultAvatarUrl } from "../utils/constants";

export const DriverPopUp = ({ driver }) => {
  console.log(driver?.ratings);
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
        <Rating text={true} value={driver?.ratings || "0"} />

        <p className="card-text">
          <b>
            Status: <span className="color-secondary">Available</span>
          </b>
        </p>
      </div>
      <a
        href={`driver/${driver?.id}`}
        className="btn btn-secondary color-light mt-2 w-100"
      >
        More info
      </a>
    </div>
  );
};
