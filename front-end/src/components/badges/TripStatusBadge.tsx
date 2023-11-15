import { tripStatuses } from "../../utils/types";

export const TripStatusBadge = ({ status }: { status: tripStatuses }) => {
  type classVariantType = {
    [key in tripStatuses]: string;
  };

  const classVariant: classVariantType = {
    [tripStatuses.ONGOING]: "bg-secondary text-white",
    [tripStatuses.FINISHED]: "bg-success text-light",
    [tripStatuses.CANCELLED]: "bg-danger text-white",
    [tripStatuses.PENDING]: "bg-gray text-dark",
  };
  return (
    <span className={`badge rounded-pill ${classVariant[status]}`}>
      {status}{" "}
      {status === tripStatuses.FINISHED && (
        <i className="fa fa-check" aria-hidden="true"></i>
      )}
    </span>
  );
};
