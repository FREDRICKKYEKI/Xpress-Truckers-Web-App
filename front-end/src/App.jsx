import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { promiseStates } from "./utils/utils";

function App() {
  const promiseState = useSelector((state) => state.promiseState);
  const currentLocation = useSelector((state) => state.currentLocation);

  useEffect(() => {
    document.querySelector("#input-origin").value = currentLocation.formatted;
  }, []);
  useEffect(() => {
    console.log(promiseState);
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
        position: toast.POSITION.TOP_RIGHT,
        closeButton: true,
        autoClose: 10,
      });
    } else if (promiseState.state === promiseStates.REJECTED) {
      toast.dismiss();
      toast(promiseState.message, {
        position: toast.POSITION.TOP_CENTER,
        closeButton: true,
        delay: 200,
      });
    }
  }, [promiseState.state]);

  return (
    <>
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/driver" element={<Driver />} />
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
