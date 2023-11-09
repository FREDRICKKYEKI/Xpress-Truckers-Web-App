import useAuth from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { routes } from "../utils/constants";
import { childrenProps } from "../utils/types";

export const RequireAuth = ({ children }: childrenProps) => {
  const location = useLocation();
  const { token } = useAuth();

  if (!token?.user?.email) {
    toast.dismiss();
    toast.info("Please sign in to continue...", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    return <Navigate to={routes.login} state={location.pathname} />;
  }

  return <>{children}</>;
};
