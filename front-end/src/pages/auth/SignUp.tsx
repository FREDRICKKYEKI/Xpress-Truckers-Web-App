import { useEffect, useRef, useState } from "react";
import "../../styles/authPagesStyles.css";
import { LogoIcon } from "../../components/logos/LogoIcon";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { VEHICLE_TYPES, routes } from "../../utils/constants";
import { geoSearch, registerUser } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setPromiseState } from "../../StateManagement/store";
import { toast } from "react-toastify";
import { UserRegistrationData } from "../../utils/DataModels";
import { Link, useNavigate } from "react-router-dom";
import {
  editType,
  editTypes,
  locationData,
  promiseStates,
  serviceResponse,
  userTypes,
  vehicleTypes,
} from "../../utils/types";
import useAuth from "../../contexts/AuthProvider";
import { useUser } from "../../hooks/useUser";

const SignUp = ({ editType = "register" }: { editType: editType }) => {
  const dispatch = useDispatch();
  const user = useUser()?.user;
  const { token } = useAuth();
  const promiseState = useSelector((state: RootState) => state.promiseState);
  const services = useSelector((state: RootState) => state.services);
  const [showDriverControls, setShowDriverControls] = useState(false);
  const [locations, setLocations] = useState<locationData[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const firstNameRef = useRef(null) as any;
  const lastNameRef = useRef(null) as any;
  const emailRef = useRef(null) as any;
  const passwordRef = useRef(null) as any;
  const carRegRef = useRef(null) as any;
  const carTypeRef = useRef(null) as any;
  const carModelRef = useRef(null) as any;
  const locationRef = useRef(null) as any;
  const navigate = useNavigate();

  useEffect(() => {
    if (editType === editTypes.UPDATE) {
      if (!token) {
        toast.warning("You need to be logged in to access this page!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
        navigate(routes.login);
      }
      if (firstNameRef.current) {
        firstNameRef.current.value = token?.user.first_name || "";
      }
      if (lastNameRef.current) {
        lastNameRef.current.value = token?.user.last_name || "";
      }
      if (emailRef.current) {
        emailRef.current.value = token?.user.email || "";
      }
      setPhoneNumber(token?.user.phonenumber);
      setShowDriverControls(
        token?.user.role === userTypes.DRIVER ? true : false
      );
      if (token?.user.role === userTypes.DRIVER && user && "vehicle" in user) {
        if (carRegRef.current) {
          carRegRef.current.value = user.vehicle.vehicle_registration || "";
        }
        if (carTypeRef.current) {
          carTypeRef.current.value = user.vehicle.vehicle_type || "";
        }
        if (carModelRef.current) {
          carModelRef.current.value = user.vehicle.make || "";
        }
        if (locationRef.current) {
          locationRef.current.placeholder = "please select a location";
        }
        const services = document.querySelectorAll<HTMLInputElement>(
          "[data-role=service]"
        );
        services?.forEach((service) => {
          user?.services?.map((drivService) => {
            if (drivService.service_id?.trim() === service.value?.trim()) {
              service.checked = true;
            }
          });
        });
      }
    }
  }, [user]);

  /**
   * Handles the driver controls based on the selected user type.
   * @param e - The event object.
   */
  function handleDriverControls(e: any) {
    if (e.target.id === userTypes.DRIVER) {
      setShowDriverControls(true);
    } else {
      setShowDriverControls(false);
    }
  }

  /**
   * Fetches locations based on user input.
   * @param e - The event object.
   */
  function fetchLocations(e: any) {
    const text = e.target.value;
    if (text.length < 3) return;

    geoSearch(text)
      .then((data: any) => {
        dispatch(setPromiseState(promiseStates.FULFILLED, "Location found!"));
        setLocations(data.results);
      })
      .catch(() => {
        dispatch(setPromiseState(promiseStates.REJECTED, "Error!"));
      });
  }

  /**
   * Handles the sign up form submission.
   * @param {any} e - The form submission event.
   */
  function handleSignUp(e: any) {
    e.preventDefault();

    const firstname: string = firstNameRef.current?.value || "";
    const lastname: string = lastNameRef.current?.value || "";
    const email: string = emailRef.current?.value || "";
    const password: string = passwordRef.current?.value || "";
    const phonenumber: string = phoneNumber || "";
    const usertype: userTypes = showDriverControls
      ? userTypes.DRIVER
      : userTypes.REGULAR;
    const vehicleRegistration: string = carRegRef.current?.value || "";
    const vehicleType: vehicleTypes | string = carTypeRef.current?.value || "";
    const vehicleModel: string = carModelRef.current?.value || "";
    const location: string = locationRef.current?.value || "";
    const placeOperation: locationData | string =
      location === locations[0]?.formatted ? locations[0] : location;

    const services = document.querySelectorAll<HTMLInputElement>(
      "[data-role=service]"
    );
    const servicesArray: string[] = [];

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
        registerUser(
          user.toObject(),
          editType === editTypes.UPDATE ? "PUT" : "POST"
        )
          .then((data) => {
            console.log(data);
            toast.dismiss();
            toast.success("Registration Successful!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 500,
            });

            navigate(routes.login);
          })
          .catch((err) => {
            toast.dismiss();
            toast.error(err?.response?.data?.error, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 500,
            });
          });
      }
    } catch (e: any) {
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
          <a
            style={{ color: "var(--color-secondary)" }}
            className=""
            href={routes.home}
          >
            &larr; <b>Go back</b>
          </a>
        </div>
        <LogoIcon size="md" />
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
              onChange={(e: any) => setPhoneNumber(e)}
            />
          </div>
          <div className="mb-3" onChange={handleDriverControls}>
            <label htmlFor="role">Register as ?:</label>
            <input
              className="custom-control-input"
              id={userTypes.REGULAR}
              onChange={handleDriverControls}
              type="radio"
              checked={!showDriverControls}
              name="role"
              value="user"
            />{" "}
            Regular User
            <input
              className="custom-control-input"
              id={userTypes.DRIVER}
              onChange={handleDriverControls}
              checked={showDriverControls}
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
                  ref={carTypeRef as any}
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
                  {Object.values(services).map((service: unknown) => (
                    <div
                      key={(service as serviceResponse)?.id}
                      className="mb-1 form-check"
                    >
                      <label
                        data-role="service"
                        className="form-check-label"
                        htmlFor={`service-${(service as serviceResponse)?.id}`}
                      >
                        {(service as serviceResponse)?.name}
                      </label>
                      <input
                        data-role="service"
                        type="checkbox"
                        value={(service as serviceResponse)?.id}
                        className="form-check-input"
                        id={`service-${(service as serviceResponse)?.id}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <button
            disabled={promiseState.state == promiseStates.PENDING}
            className="btn btn-primary"
            type="submit"
          >
            Register
          </button>
          <div className="d-flex justify-content-between mt-3 mb-5">
            <span>
              Already have an account?{" "}
              <Link
                to={routes.login}
                style={{
                  color: "var(--color-secondary)",
                }}
              >
                <span>Sign in</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
