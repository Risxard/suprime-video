import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import MenuSlider from "./Components/Header/MenuSlider/MenuSlider.jsx";
import { useMatch } from "react-router-dom";
import { checkAuth } from "./store/auth/index.js";
import Cookies from "js-cookie";
import PrivateLayout from "./routes/PrivateLayout.jsx";
import PrivateStandalone from "./routes/PrivateStandalone.jsx";

function App() {
  const token = Cookies.get("@AuthToken");

  useEffect(() => {
    if (token) {
      console.log("Token no Cookie: " + token);
    }
  }, []);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);







  return (
    <div className="App">
      <PrivateLayout isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
