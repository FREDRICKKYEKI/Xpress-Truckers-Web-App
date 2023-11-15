import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import Driver from "./pages/Driver";
import Profile from "./pages/auth/Profile";
import NavBar from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_NAME, apiEndpoints, routes } from "./utils/constants";
import { capitalize, getXTData } from "./utils/utils";
import { NotFound } from "./pages/NotFound";
import { RootState, setServices } from "./StateManagement/store";
import { editTypes, promiseStates, serviceResponse } from "./utils/types";
import { DriverDashboard } from "./pages/DriverDashboard";
import { LogoIcon } from "./components/logos/LogoIcon";
import { UserDashboard } from "./pages/DashBoard";
import { Loader } from "./components/Loader";

function App() {
  const promiseState = useSelector((state: RootState) => state.promiseState);
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const noNavs = [
    routes.login,
    routes.signup,
    routes.editUser,
    routes.driverDashboard,
    routes.userDashboard,
  ];
  const v2Paths = ["profile", "driver"];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${COMPANY_NAME} | ${
      capitalize(location.pathname.split("/")[1]) || "Home"
    }`;
  }, [location]);

  useEffect(() => {
    getXTData(apiEndpoints.services)
      .then((data: unknown) => {
        let serviceData = data as serviceResponse[];
        let services: { [key: string]: serviceResponse } = {};
        setLoading(false);
        for (let service of serviceData) {
          services[service.id] = service;
        }
        dispatch(setServices(services));
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
      });

    try {
      const inputOrigin =
        document.querySelector<HTMLInputElement>("#input-origin");
      if (inputOrigin) {
        inputOrigin.value = currentLocation.formatted;
      }
    } catch (e) {}
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
      let message = promiseState.message || "Something went wrong!";
      toast.error(message, {
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
      {!loading ? (
        <main className="main">
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route
              path={routes.signup}
              element={<Signup editType={editTypes.REGISTER} />}
            />
            <Route path={routes.login} element={<LogIn />} />
            <Route
              path={routes.driverRoute}
              element={
                <RequireAuth>
                  <Driver />
                </RequireAuth>
              }
            />
            <Route
              path={routes.profile}
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path={routes.driverDashboard}
              element={
                <RequireAuth>
                  <DriverDashboard />
                </RequireAuth>
              }
            />
            <Route
              path={routes.userDashboard}
              element={
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              }
            />
            <Route
              path={routes.editUser}
              element={<Signup editType={editTypes.UPDATE} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </main>
      ) : (
        <>
          <LogoIcon size="md" className="pulsating" />
          <Loader />
        </>
      )}
    </>
  );
}

export default App;
