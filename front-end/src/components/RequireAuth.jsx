import React, { useEffect } from "react";
import useAuth from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RequireAuth = ({ children }) => {
  // const currentUser = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!currentUser?.name) {
  //     toast.dismiss();
  //     toast.info("Please sign in to continue...", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 1000,
  //     });
  //     navigate("/login");
  //   }
  // }, []);
  return <>{children}</>;
};
