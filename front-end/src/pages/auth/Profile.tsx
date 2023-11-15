import "../../styles/profile.css";
import { Rating } from "../../components/Rating";
import { defaultAvatarUrl, routes } from "../../utils/constants";
import useAuth from "../../contexts/AuthProvider";
import { userTypes } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token?.user.role === userTypes.DRIVER) navigate(routes.driverDashboard);
  }, []);
  return (
    <section className="profile-details d-flex justify-content-center">
      <div className="profile__card card mb-4">
        <div className="profile__header">
          <h2 className="profile__header__title">My Profile</h2>
        </div>
        <div className="profile__icon">
          <img
            alt="profile"
            src={defaultAvatarUrl}
            className="profile__icon card-img"
          />
          <a href={routes.editUser} className="btn btn-primary">
            <i className="fa-solid fa-pen" />
          </a>
        </div>
        <div className="profile__card__body card-body p-0 text-center">
          <h5 className="card-title">
            {token?.user?.first_name} {token?.user?.last_name}
          </h5>
          <p className="card-text">{token?.user?.email}</p>
          <p className="card-text">{token?.user?.phonenumber}</p>
          <p className="card-text">Nairobi, Kenya</p>
          <Rating
            className="color-dark"
            text={true}
            value={token?.user?.ratings}
          />
        </div>
        <a href={routes.userDashboard} className="">
          Go to Dashboard
        </a>
      </div>
    </section>
  );
};

export default Profile;
