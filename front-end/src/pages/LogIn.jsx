import { LogoIcon } from "../components/logos/LogoIcon";
import React, { useRef, useState } from "react";
import "../styles/authPagesStyles.css";
import { UserLogInData } from "../utils/DataModels";
import { toast } from "react-toastify";
import { logInTypes } from "../utils/constants";
import { signInUser } from "../utils/utils";
import useAuth from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState(logInTypes.EMAIL);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setToken, setCurrentUser } = useAuth();

  function handleEmailChange(e) {
    if (e.target?.value.includes("@")) {
      setLoginType(logInTypes.EMAIL);
    } else {
      setLoginType(logInTypes.PHONE);
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    const email = document.querySelector("#email-login").value;
    const password = passwordRef.current.value;
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
          .then((res) => {
            toast.dismiss();
            toast.success("Sign up successful", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 400,
            });
            console.log(res);
            setToken(res.token);
            setCurrentUser(res.user);
            navigate("/profile");
          })
          .catch((err) => {
            toast.dismiss();

            toast.error(err?.response?.data?.error, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 400,
            });
          });
      }
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 800,
      });
    }
  }
  return (
    <section className="auth-form">
      <div className="container login-form">
        <div className="d-flex justify-content-between  mt-3">
          <span style={{ color: "var(--color-secondary)" }}>
            &larr;
            <a
              className=""
              style={{ color: "var(--color-secondary)" }}
              href="/"
            >
              <b>Go Back</b>
            </a>
          </span>
        </div>
        <LogoIcon size="sm" />
        <h2 className="m-1 text-center">Welcome back</h2>
        <h3 className="text-center">Sign In</h3>
        <form onSubmit={handleLogin} className="" id="registration-form">
          {/* email */}
          <div className="form-group mb-3">
            <label htmlFor="email-login">Email address</label>
            <input
              type={loginType == logInTypes.EMAIL ? "email" : "text"}
              onChange={handleEmailChange}
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
              <a
                href="/signup"
                style={{
                  color: "var(--color-secondary)",
                  textDecoration: "none",
                }}
              >
                &nbsp;Register
              </a>
            </span>
          </div>
        </form>
        <div className="d-flex justify-content-between  mb-2"></div>
      </div>
    </section>
  );
};

export default LogIn;
