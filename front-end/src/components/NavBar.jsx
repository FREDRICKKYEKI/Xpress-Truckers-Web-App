import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { LogoBrandName } from "./logos/LogoNoIcon";
import { useWindowSize } from "@uidotdev/usehooks";

const NavBar = ({ variant = "v1" }) => {
  const { _, width } = useWindowSize();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const classVariants = {
    v1: "",
    v2: "profile-header d-flex align-items-start pt-3 ",
  };

  return (
    <header className={`navbar  ${classVariants[variant]} navbar`}>
      <LogoBrandName variant={variant} />
      {width > 768 ? (
        <span className="options" style={{ color: "var(--color-white-03)" }}>
          <NavLink className={"nav-item"} to="#">
            Become a Driver
          </NavLink>
          <NavLink className={"nav-item"} to="/profile">
            Profile
          </NavLink>
          <NavLink
            className={"nav-item"}
            style={{ color: "var(--color-secondary)" }}
          >
            About Us
          </NavLink>
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
              <a className={"nav-item "} href="#">
                Become a Driver
              </a>
              <a className={"nav-item w-100"} href="/profile">
                Profile
              </a>
              <a className={"nav-item w-100 color-secondary"}>About Us</a>
            </span>
          )}
        </span>
      )}
    </header>
  );
};

export default NavBar;
