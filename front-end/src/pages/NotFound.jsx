import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.dismiss();
    toast.warning("Page not found", {
      position: toast.POSITION.BOTTOM_CENTER,
      closeButton: true,
      delay: 200,
    });
    navigate("/");
  }, []);
};
