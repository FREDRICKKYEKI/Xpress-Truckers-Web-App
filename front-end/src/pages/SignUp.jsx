import React, { useEffect, useRef, useState } from "react";
import "../styles/authPagesStyles.css";
import { LogoIcon } from "../components/logos/LogoIcon";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  SERVICES,
  VEHICLE_TYPES,
  userTypes,
  promiseStates,
} from "../utils/constants";
import { geoSearch, registerUser } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setPromiseState } from "../StateManagement/store";
import { toast } from "react-toastify";
import { UserRegistrationData } from "../utils/DataModels";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const promiseState = useSelector((state) => state.promiseState);
  const [showDriverControls, setShowDriverControls] = useState(false);
  const [locations, setLocations] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const carRegRef = useRef();
  const carTypeRef = useRef();
  const carModelRef = useRef();
  const locationRef = useRef();
  const navigate = useNavigate();

  function handleDriverControls(e) {
    if (e.target.id === userTypes.DRIVER) {
      setShowDriverControls(true);
    } else {
      setShowDriverControls(false);
    }
  }

  function fetchLocations(e) {
    const text = e.target.value;
    if (text.length < 3) return;

    geoSearch(text)
      .then((data) => {
        dispatch(setPromiseState(promiseStates.FULFILLED, "Location found!"));
        setLocations(data.results);
      })
      .catch((error) => {
        dispatch(setPromiseState(promiseStates.REJECTED, "Error!"));
      });
  }

  function handleSignUp(e) {
    e.preventDefault();
    const firstname = firstNameRef.current.value;
    const lastname = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phonenumber = phoneNumber;
    const usertype = showDriverControls ? userTypes.DRIVER : userTypes.REGULAR;
    const vehicleRegistration = carRegRef.current?.value || null;
    const vehicleType = carTypeRef.current?.value || null;
    const vehicleModel = carModelRef.current?.value || null;
    const location = locationRef.current?.value || null;
    const placeOperation =
      location == locations[0]?.formatted ? locations[0] : location;

    const services = document.querySelectorAll("[data-role=service]");
    const servicesArray = [];

    services.forEach((service) => {
      if (service.checked) {
        servicesArray.push(service.value);
      }
    });
    const user = new UserRegistrationData({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phonenumber: phonenumber,
      usertype: usertype,
      vehicleRegistration: vehicleRegistration,
      vehicleType: vehicleType,
      vehicleModel: vehicleModel,
      placeOperation: placeOperation,
      services: servicesArray,
    });
    try {
      if (user.isValid()) {
        toast.dismiss();
        toast.loading("Signing Up...", {
          position: toast.POSITION.TOP_CENTER,
          closeButton: true,
        });
        registerUser(user.toObject())
          .then((data) => {
            console.log(data);
            toast.dismiss();
            toast.success("Registration Successful!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 500,
            });

            navigate("/login");
          })
          .catch((err) => {
            toast.error(err?.response?.data?.error, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 500,
            });
          });
      }
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  }

  return (
    <section className="auth-form ">
      <div className="container">
        <h1 className="text-center">Registration Form</h1>
        <div className="d-flex justify-content-between">
          <a style={{ color: "var(--color-secondary)" }} className="" href="/">
            &larr; <b>Go back</b>
          </a>
        </div>
        <LogoIcon />
        <form
          onSubmit={handleSignUp}
          className="reg-form"
          id="registration-form"
        >
          {/* username */}
          <div id="username" className="row mb-2">
            <div className="col">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="First Name"
                required
                ref={firstNameRef}
              />
            </div>
            <div className="col">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Last Name"
                required
                ref={lastNameRef}
              />
            </div>
          </div>
          {/* email */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              ref={emailRef}
              required
            />{" "}
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          {/* password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="show_password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="show_password">
                Show Password
              </label>
            </div>
          </div>
          {/* phone number*/}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput
              placeholder="Enter phone number: 07xxxxxxx"
              defaultCountry="KE"
              className=""
              id="phone"
              required
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          <div className="mb-3" onChange={handleDriverControls}>
            <label htmlFor="role">Register as ?:</label>
            <input
              className="custom-control-input"
              id={userTypes.REGULAR}
              onChange={handleDriverControls}
              type="radio"
              defaultChecked
              name="role"
              value="user"
            />{" "}
            Regular User
            <input
              className="custom-control-input"
              id={userTypes.DRIVER}
              onChange={handleDriverControls}
              type="radio"
              name="role"
              value="driver"
            />{" "}
            Driver
          </div>
          {/* <!-- Driver-specific controls --> */}
          {showDriverControls && (
            <div className="driver-controls">
              <hr />
              <h4>Driver Details Only</h4>
              <span>
                <i>
                  This area is only for users signing up as drivers. If you wish
                  to register as a regular user of this app please select the{" "}
                  <b>Regular User</b> option above.
                </i>
              </span>
              <hr />
              <div id="map"></div>
              <div className="form-group">
                <label htmlFor="registration">
                  Registration Number (Number plate):
                </label>
                <input
                  placeholder="e.g KAK 350N"
                  type="text"
                  ref={carRegRef}
                  className="form-control"
                  id="vehicle-registration"
                  name="registration"
                />
              </div>
              <div className="form-group">
                <label htmlFor="place">Place of operation:</label>
                <input
                  required
                  onInput={fetchLocations}
                  type="text"
                  ref={locationRef}
                  onBlur={() => toast.dismiss()}
                  onFocus={() =>
                    toast.loading("Finding location...", {
                      position: toast.POSITION.TOP_CENTER,
                    })
                  }
                  placeholder={"e.g Nairobi, Eldoret"}
                  className="form-control"
                  list="list-origin"
                  id="input-origin"
                />
                <datalist id="list-origin">
                  {locations?.map((place, index) => (
                    <option key={index}>{place.formatted}</option>
                  ))}
                </datalist>
              </div>
              <div className="input-group mb-2 justify-content-between">
                <label className="form-check-label fs-6" htmlFor="v-type">
                  Vehicle Type:
                </label>
                <select
                  ref={carTypeRef}
                  defaultValue={"null"}
                  id="v-type"
                  className="custom-select p-2 w-100"
                >
                  <option value={"null"}>Choose...</option>
                  {VEHICLE_TYPES.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.type}>
                      {vehicle.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="vehicle-make">Vehicle model/make:</label>
                <input
                  placeholder="e.g Toyota hillux"
                  type="text"
                  ref={carModelRef}
                  className="form-control"
                  id="vehicle-make"
                  name="make"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="services">Pick the services you provide:</label>
                <div id="services">
                  {SERVICES.map((service) => (
                    <div key={service.id} className="mb-1 form-check">
                      <label
                        data-role="service"
                        className="form-check-label"
                        htmlFor={`service-${service.id}`}
                      >
                        {service.name}
                      </label>
                      <input
                        data-role="service"
                        type="checkbox"
                        value={service.id}
                        className="form-check-input"
                        id={`service-${service.id}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <button
            disabled={promiseState == promiseStates.PENDING}
            className="btn btn-primary"
            type="submit"
          >
            Register
          </button>
          <div className="d-flex justify-content-between mt-3">
            <span>
              Already have an account?{" "}
              <a
                href="/login"
                style={{
                  color: "var(--color-secondary)",
                  // textDecoration: "none",
                }}
              >
                <span>Sign in</span>
              </a>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
