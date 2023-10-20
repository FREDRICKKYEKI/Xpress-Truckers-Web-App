import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { Provider } from "react-redux";
// import { store } from "./StateManagement/store.js";
// import AuthProvider from "./contexts/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
    {/* </Provider> */}
  </React.StrictMode>
);
