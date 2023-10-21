import React, { useEffect } from "react";
import useAuth from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.name) {
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};
