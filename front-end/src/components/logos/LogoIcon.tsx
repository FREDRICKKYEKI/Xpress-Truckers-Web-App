import logo from "/logos/logo.png";
import { COMPANY_NAME, routes } from "../../utils/constants";
import { Link } from "react-router-dom";

export const LogoIcon = ({ size = "md" }: { size: "sm" | "md" }) => {
  const STYLES: { [key: string]: any } = {
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
    <Link to={routes.home} className="d-flex justify-center align-center">
      <img style={STYLES[size]} src={logo} alt={COMPANY_NAME} />
    </Link>
  );
};
