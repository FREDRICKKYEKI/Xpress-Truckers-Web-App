import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Driver from "./pages/Driver";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    <>
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/home" exact element={<Home />} />
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
