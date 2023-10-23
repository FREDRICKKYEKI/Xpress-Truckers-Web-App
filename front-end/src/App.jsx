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

function App() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1);

    path.length > 0
      ? (document.title =
          "Xpress Truckers" +
          " | " +
          path.charAt(0).toUpperCase() +
          path.slice(1))
      : (document.title = "Xpress Truckers");
  }, [location.pathname]);

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
      </main>
    </>
  );
}

export default App;
