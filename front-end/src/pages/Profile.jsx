import React from "react";
import "../styles/profile.css";
import { Rating } from "../components/Rating";
import { defaultAvatarUrl } from "../utils/constants";
import useAuth from "../contexts/AuthProvider";

const Profile = () => {
  const { token } = useAuth();
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
        <div className="profile__card__body card-body p-0">
          <h5 className="card-title">
            {token?.user?.first_name} {token?.user?.last_name}
          </h5>
          <p className="card-text">{token?.user?.email}</p>
          <p className="card-text">{token?.user?.phone}</p>
          <p className="card-text">Nairobi, Kenya</p>
          <p className="card-text">
            Rating: <b>{token?.user?.rating}</b>
          </p>
          <Rating color="secondary" value={token?.user?.rating} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
