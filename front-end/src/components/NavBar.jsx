import React from "react";
import { Logo1 } from "./logos/Logo1";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="navbar">
      <Logo1 />
      <span className="options" style={{ color: "var(--color-white-03)" }}>
        <NavLink to="#">Become a Driver</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink style={{ color: "var(--color-secondary)" }}>About Us</NavLink>
      </span>
    </header>
  );
};

export default NavBar;
