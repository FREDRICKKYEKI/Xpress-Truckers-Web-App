import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.dismiss();
    toast.warning("Page not found", {
      position: toast.POSITION.TOP_CENTER,
      closeButton: true,
      delay: 200,
    });
    navigate("/");
  }, []);
};
