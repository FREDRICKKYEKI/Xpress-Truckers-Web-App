import React from "react";
import logo from "/logos/logo.png";
import { COMPANY_NAME } from "../../utils/constants";
import { Link } from "react-router-dom";

export const LogoIcon = ({ size = "md" }) => {
  const STYLES = {
    sm: {
      maxWidth: "130px",
      marginInline: "auto",
    },
    md: {
      maxWidth: "250px",
      marginInline: "auto",
    },
  };
  return (
    <Link to="/" className="d-flex justify-center align-center">
      <img style={STYLES[size]} src={logo} alt={COMPANY_NAME} />
    </Link>
  );
};
