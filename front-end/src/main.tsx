import "./styles/index.css";
// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./StateManagement/store.js";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </Router>
    // </React.StrictMode>
  );
}
