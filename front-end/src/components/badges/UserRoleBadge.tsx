import { userTypes } from "../../utils/types";
import { capitalize } from "../../utils/utils";

export const UserRoleBadge = ({ role }: { role: userTypes }) => {
  return (
    <span
      className={`badge rounded-pill ${
        role === userTypes.REGULAR ? "bg-primary" : "bg-secondary"
      }`}
    >
      {capitalize(role)}
    </span>
  );
};
