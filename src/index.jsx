import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Provider } from "react-redux";
import store from './store/store.js'

import App from './App.jsx'
import Home from './Pages/Home/Home'
import Movie from './Pages/MediaPlayer/Movie.jsx'
import Movies from './Pages/Movies/Movies.jsx'
import Tv from './Pages/MediaPlayer/Tv.jsx'
import Search from './Pages/Search/Search.jsx'
import TvSeries from './Pages/TvSeries/TvSeries.jsx'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'

import "./index.css";
import Settings from "./Pages/Settings/Settings.jsx";

const language = localStorage.getItem("country");
const logged = localStorage.getItem("statusLog");


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/suprime-video/" element={logged != 'true' ? <LandingPage /> : <Navigate to="/suprime-video/home" />} >
          
        </Route>

        <Route language={language} element={<App />}>
          <Route path="/suprime-video/home" element={logged == 'true' ? <Home /> : <Navigate to="/suprime-video/" />} />
          <Route path="/suprime-video/movies" element={logged == 'true' ? <Movies /> : <Navigate to="/suprime-video/" />} />
          <Route path="/suprime-video/movie/:id" element={<Movie />} />
          <Route path="/suprime-video/tv/:id" element={<Tv />} />
          <Route path="/suprime-video/tv-series" element={logged == 'true' ? <TvSeries /> : <Navigate to="/suprime-video/" />} />
          <Route path="/suprime-video/search" element={logged == 'true' ? <Search /> : <Navigate to="/suprime-video/" />} />
          <Route path="/suprime-video/settings" element={logged == 'true' ? <Settings /> : <Navigate to="/suprime-video/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
