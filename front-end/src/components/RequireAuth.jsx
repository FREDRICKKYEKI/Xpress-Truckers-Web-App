import React, { useEffect } from "react";
import useAuth from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useAuth();

  if (!token?.user?.email) {
    toast.dismiss();
    toast.info("Please sign in to continue...", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    return <Navigate to="/login" state={location.pathname} />;
  }

  return <>{children}</>;
};
