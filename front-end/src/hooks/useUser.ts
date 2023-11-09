import { apiEndpoints } from "../utils/constants";
import { getXTData } from "../utils/utils";
import { useEffect, useState } from "react";
import { driverResponse, userResponse } from "../utils/types";
import { useParams } from "react-router-dom";
import useAuth from "../contexts/AuthProvider";
import { toast } from "react-toastify";

export const useUser = () => {
  const params = useParams();
  const [user, setUser] = useState<driverResponse | userResponse | null>(null);
  const { token } = useAuth();
  let userId: string | undefined;
  console.log(params.id);
  if (params.id) {
    userId = params.id;
  } else {
    userId = token?.user.id;
  }

  useEffect(() => {
    if (!token) return;
    toast.loading("Loading user data...");
    if (token.user.role === "driver") {
      getXTData(apiEndpoints.driver(userId))
        .then((data: unknown) => {
          console.log(data);
          setUser(data as driverResponse | userResponse);
          toast.dismiss();
          toast.success("Done!");
        })
        .catch((error) => {
          toast.dismiss();
          toast.error("Error!");
          console.log(error);
        });
    } else
      getXTData(apiEndpoints.user(userId))
        .then((data: unknown) => {
          console.log(data);
          setUser(data as driverResponse | userResponse);
          toast.dismiss();

          toast.success("Done!");
        })
        .catch((error) => {
          toast.dismiss();

          toast.error("Error!");
          console.log(error);
        });
  }, []);

  return { user: user };
};
