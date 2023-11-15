import { useEffect, useState } from "react";
import { driverResponse } from "../../utils/types";
import { VEHICLE_SIZE_TYPES } from "../../utils/constants";
import { getUnsplashPhotos } from "../../utils/utils";

export function VehicleImagesCard({ driver }: { driver: driverResponse }) {
  const [sampleTrucks, setSampleTrucks] = useState<any>([]);

  useEffect(() => {
    if (driver && "vehicle" in driver) {
      const vehicleType =
        VEHICLE_SIZE_TYPES[driver?.vehicle?.vehicle_type as "A" | "B" | "C"];
      getUnsplashPhotos({ query: vehicleType })
        .then((data) => {
          setSampleTrucks(data.results);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [driver]);

  return (
    <div className="vehicle__card card mx-auto w-100">
      <h5>
        <u>Vehicle:</u>
      </h5>
      <div className="vehicle_imgs">
        {sampleTrucks?.map((result: any) => (
          <div key={result?.id}>
            <img alt="vehicle" src={result?.urls?.regular} />
          </div>
        ))}
      </div>
    </div>
  );
}
