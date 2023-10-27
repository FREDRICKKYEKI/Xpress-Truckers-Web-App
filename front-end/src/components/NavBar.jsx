import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { LogoBrandName } from "./logos/LogoNoIcon";

const NavBar = () => {
  return (
    <header className="navbar">
      <LogoBrandName />
      <span className="options" style={{ color: "var(--color-white-03)" }}>
        <NavLink to="#">Become a Driver</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink style={{ color: "var(--color-secondary)" }}>About Us</NavLink>
      </span>
    </header>
  );
};

export default NavBar;
