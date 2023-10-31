import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import {
  SERVICES,
  VEHICLE_TYPES,
  defaultAvatarUrl,
  getUnsplashPhotos,
} from "../utils/utils";
import { toast } from "react-toastify";
import { Rating } from "../components/Rating";

const Driver = () => {
  const [sampleTrucks, setSampleTrucks] = useState([]);
  const rating = 3.9;
  useEffect(() => {
    toast.loading("Loading...", { position: toast.POSITION.TOP_CENTER });
    getUnsplashPhotos({ query: "semi-truck" })
      .then((data) => {
        toast.dismiss();
        setSampleTrucks(data.results);
        console.log(data);
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err);
      });
  }, []);
  return (
    <section className="driver-details d-flex justify-content-evenly color-dark">
      <div
        style={{ border: "none" }}
        className="profile__card card mobile_profile__card"
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
          <h5 className="card-title">John Doe</h5>
          <p className="card-text"></p>
          <Rating text={true} value={rating} />
          <p className="card-text">
            <b>Email: </b>JohnDoe@gmail.com
          </p>
          <p className="card-text">
            <b>Contact: </b>+254*********8
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
      <div className="driver-details__card card">
        <div className="">
          <h5>
            <u>Details:</u>
          </h5>
        </div>
        <div className="card-body">
          <p className="card-text">
            <b>Truck Type: </b>
            <i className="color-secondary">{VEHICLE_TYPES[0].name}</i>
          </p>
          <p className="card-text">
            <b>Vehicle Model: </b>
            <i className="color-secondary">Toyota Hillux</i>
          </p>
          <p className="card-text">
            <b>Registration: </b>
            <i className="color-secondary">KCK 390N</i>
          </p>
          <p className="card-text font-weight-bold">
            <b>Operates in: </b>
            <i className="color-secondary"> Nairobi, Kenya</i>
          </p>
          <p className="card-text">
            <b>Services Offered: </b>
          </p>
          <div className="driver-details__footer py-2">
            <ul>
              {SERVICES.slice(1, 3).map((service) => (
                <li key={service.id}>{service.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Vehicles */}
      <div className="vehicle__card card mb-3">
        <h5>
          <u>Vehicle:</u>
        </h5>
        <div className="vehicle_imgs">
          {sampleTrucks?.map((result) => (
            <div key={result.id}>
              <img alt="vehicle" src={result.urls.regular} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Driver;
