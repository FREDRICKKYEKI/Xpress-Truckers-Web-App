import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Loading...", {
        position: toast.POSITION.TOP_CENTER,
        closeButton: true,
      });
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

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
