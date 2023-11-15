import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <a onClick={() => navigate(-1)} href="#" className="color-secondary">
      &larr; &nbsp;
      <b>Go Back</b>
    </a>
  );
};
