import { promiseStates } from "../utils/constants";
import { getXTData } from "../utils/utils";
import { setDrivers } from "../StateManagement/store";
import { useEffect, useState } from "react";

export const useDrivers = () => {
  const [drivers, setDrivers_] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getXTData("drivers")
      .then((data) => {
        setDrivers_(data);
        setDrivers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  return [isLoading, drivers];
};
