import React from "react";
import { Logo1 } from "./logos/Logo1";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <header className="navbar">
      <Logo1 />
      <span className="options" style={{ color: "var(--color-white-03)" }}>
        <h5>Become a Driver</h5>
        <h5>Profile</h5>
        <h5 style={{ color: "var(--color-secondary)" }}>About Us</h5>
      </span>
    </header>
  );
};

export default NavBar;
