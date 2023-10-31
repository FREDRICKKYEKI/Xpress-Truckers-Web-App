import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Driver from "./pages/Driver";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {
  COMPANY_NAME,
  capitalize,
  getXTData,
  promiseStates,
} from "./utils/utils";
import { NotFound } from "./pages/NotFound";

function App() {
  const promiseState = useSelector((state) => state.promiseState);
  const currentLocation = useSelector((state) => state.currentLocation);
  const location = useLocation();
  const noNavs = ["/login", "/signup"];
  const v2Paths = ["profile", "driver"];

  useEffect(() => {
    document.title = `${COMPANY_NAME} | ${
      capitalize(location.pathname.split("/")[1]) || "Home"
    }`;
  }, [location]);

  useEffect(() => {
    try {
      document.querySelector("#input-origin").value = currentLocation.formatted;
    } catch (e) {}

    getXTData("drivers")
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (promiseState.state === promiseStates.PENDING) {
      toast.dismiss();
      toast.loading(promiseState.message || "Loading...", {
        position: toast.POSITION.TOP_CENTER,
        closeButton: true,
      });
    } else if (promiseState.state === promiseStates.FULFILLED) {
      toast.dismiss();
      if (!promiseState.message) {
        toast.dismiss();
        return;
      }
      toast.success(promiseState.message, {
        position: toast.POSITION.TOP_CENTER,
        closeButton: true,
        autoClose: 10,
      });
    } else if (promiseState.state === promiseStates.REJECTED) {
      toast.dismiss();
      let message = "";
      if (promiseState.message?.includes("Network")) {
        message = "You are offline!";
      }
      message = promiseState.message;
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        closeButton: true,
        delay: 200,
      });
    }
  }, [promiseState.state]);

  return (
    <>
      {!noNavs.includes(location.pathname) && (
        <NavBar
          variant={`${
            v2Paths.includes(location.pathname.split("/")[1]) ? "v2" : "v1"
          }`}
        />
      )}
      <main className="main">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/driver/:id" element={<Driver />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
