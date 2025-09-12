import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";

import "./index.css";

import AppRoutes from "./routes/AppRoutes.jsx";
import AuthListener from "./services/firebase/AuthListener.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthListener />
    <AppRoutes />
  </Provider>
);
