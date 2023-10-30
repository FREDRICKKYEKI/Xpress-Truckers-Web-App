import React from "react";
import "../styles/Profile.css";
import { Rating } from "../components/Rating";
import { defaultAvatarUrl } from "../utils/utils";

const Profile = () => {
  const rating = 3.9;
  return (
    <section className="profile-details d-flex justify-content-center">
      <div className="profile__card card mb-4">
        <div className="profile__header">
          <h2 className="profile__header__title">My Profile</h2>
        </div>
        <div className="profile__icon">
          <img
            alt="profile"
            src={defaultAvatarUrl}
            className="profile__icon card-img"
          />
          <button className="btn btn-primary">
            <i className="fa-solid fa-pen" />
          </button>
        </div>
        <div className="profile__card__body text-center card-body p-0">
          <h5 className="card-title">John Doe</h5>
          <p className="card-text">JohnDoe@gmail.com</p>
          <p className="card-text">+25472345678</p>
          <p className="card-text">Nairobi, Kenya</p>
          <p className="card-text">
            Rating: <b>{rating}</b>
          </p>
          <Rating color="secondary" value={rating} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
