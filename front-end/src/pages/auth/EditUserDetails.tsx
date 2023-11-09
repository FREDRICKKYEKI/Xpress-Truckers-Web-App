import { editTypes } from "../../utils/types";
import SignUp from "./SignUp";

export const EditUserDetails = () => {
  return <SignUp editType={editTypes.UPDATE} />;
};
