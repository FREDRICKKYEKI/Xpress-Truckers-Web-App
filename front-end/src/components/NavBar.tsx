import { useState } from "react";
import "../styles/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoBrandName } from "./logos/LogoNoIcon";
import { useWindowSize } from "@uidotdev/usehooks";
import { routes } from "../utils/constants";
import useAuth from "../contexts/AuthProvider";
import { userTypes } from "../utils/types";
import { toast } from "react-toastify";

const NavBar = ({ variant = "v1" }: { variant: "v1" | "v2" }) => {
  const { width } = useWindowSize();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(true);

  const classVariants = {
    v1: "",
    v2: "profile-header d-flex align-items-start pt-3 ",
  };

  function checkIfDriver() {
    if (token?.user?.role === userTypes.DRIVER) {
      toast.error("You are already a driver");
    } else {
      navigate(routes.editUser);
    }
  }

  return (
    <header className={`navbar  ${classVariants[variant]}`}>
      <LogoBrandName variant={"v1"} />
      {width && width > 768 ? (
        <span className="options" style={{ color: "var(--color-white-03)" }}>
          <a className={"nav-item"} href="#" onClick={checkIfDriver}>
            Become a Driver
          </a>
          {token?.token ? (
            <>
              <a
                className={"nav-item"}
                href={
                  token?.user.role === userTypes.REGULAR
                    ? routes.profile
                    : routes.driverDashboard
                }
              >
                Profile
              </a>
              <a
                href="#"
                className={"nav-item"}
                onClick={() => {
                  localStorage.setItem("user_tk", "null");
                  toast.info("Logged out successfully");
                  navigate(routes.login);
                }}
              >
                Logout
              </a>
            </>
          ) : (
            <NavLink className={"nav-item"} to={routes.login}>
              Login | Sign Up
            </NavLink>
          )}
          <a
            href={routes.landingPage}
            target="_blank"
            className={"nav-item"}
            style={{ color: "var(--color-secondary)" }}
          >
            About Us
          </a>
        </span>
      ) : (
        <span className=" position-relative">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {!isNavCollapsed && (
            <span className="d-flex flex-column align-items-end options-mobile">
              <a className={"nav-item "} href={"#"} onClick={checkIfDriver}>
                Become a Driver
              </a>
              {token?.token ? (
                <>
                  <NavLink className={"nav-item w-100"} to={routes.profile}>
                    Profile
                  </NavLink>
                  <a
                    className={"nav-item w-100"}
                    onClick={() => {
                      localStorage.setItem("user_tk", "null");
                      toast.info("Logged out successfully");
                      navigate(routes.login);
                    }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <NavLink className={"nav-item w-100"} to={routes.login}>
                  Login
                </NavLink>
              )}
              <a className={"nav-item w-100 color-secondary"}>About Us</a>
            </span>
          )}
        </span>
      )}
    </header>
  );
};

export default NavBar;
