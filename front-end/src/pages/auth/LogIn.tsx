import { LogoIcon } from "../../components/logos/LogoIcon";
import { useRef, useState } from "react";
import "../../styles/authPagesStyles.css";
import { UserLogInData } from "../../utils/DataModels";
import { toast } from "react-toastify";
import { logInTypes } from "../../utils/types";
import { signInUser } from "../../utils/utils";
import useAuth from "../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants";
import { useEffect } from "react";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState(logInTypes.EMAIL);
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const { setToken, setCurrentUser } = useAuth() as any;

  function handleEmailChange(e: Event) {
    if (!e.target) return;
    if ((e.target as any)?.value.includes("@")) {
      setLoginType(logInTypes.EMAIL);
    } else {
      setLoginType(logInTypes.PHONE);
    }
  }

  function handleLogin(e: Event) {
    e.preventDefault();

    const email = (document.querySelector("#email-login") as HTMLInputElement)
      ?.value;
    const password = (passwordRef.current as any)?.value;
    const user = new UserLogInData({
      email_phone: email,
      password: password,
      type: loginType,
    });
    try {
      if (user.isValid()) {
        toast.dismiss();
        toast.loading("Signing in...", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 400,
          closeButton: true,
        });

        signInUser(user.toObject())
          .then((res: any) => {
            toast.dismiss();
            toast.success("Log in successful!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 400,
            });
            console.log(res);
            setToken(res);
            setCurrentUser(res.user);
            navigate(routes.profile);
          })
          .catch((err) => {
            toast.dismiss();
            toast.error(err?.response?.data?.error, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 400,
            });
          });
      }
    } catch (e: any) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 800,
      });
    }
  }

  useEffect(() => {
    if (token?.user) navigate(routes.profile);
  });
  return (
    <section className="auth-form">
      <div style={{ maxWidth: "500px" }} className="container login-form">
        <div className="d-flex justify-content-between  mt-3">
          <span style={{ color: "var(--color-secondary)" }}>
            &larr;
            <a
              className=""
              style={{ color: "var(--color-secondary)" }}
              href={routes.home}
            >
              <b>Go Back</b>
            </a>
          </span>
        </div>
        <LogoIcon size="sm" />
        <h2 className="m-1 text-center">Welcome back</h2>
        <h3 className="text-center">Sign In</h3>
        <form
          onSubmit={(e: any) => handleLogin(e)}
          className=""
          id="registration-form"
        >
          {/* email */}
          <div className="form-group mb-3">
            <label htmlFor="email-login">Email address</label>
            <input
              type={loginType == logInTypes.EMAIL ? "email" : "text"}
              onChange={(e: any) => handleEmailChange(e)}
              className="form-control"
              id="email-login"
              aria-describedby="emailHelp"
              placeholder="Email/Phone Number"
              ref={emailRef}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          {/* password */}
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control mb-1"
              id="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="show_password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="show_password">
                Show Password
              </label>
            </div>
          </div>
          <button className="btn btn-primary mb-2" type="submit">
            Sign In
          </button>
          <div className="d-flex justify-content-between  mt-3">
            <span>
              Don't have an account?
              <Link
                to={routes.signup}
                style={{
                  color: "var(--color-secondary)",
                  textDecoration: "none",
                }}
              >
                &nbsp;Register
              </Link>
            </span>
          </div>
        </form>
        <div className="d-flex justify-content-between  mb-2"></div>
      </div>
    </section>
  );
};

export default LogIn;
