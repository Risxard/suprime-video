import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Login,
  Register,
  Home,
  Movies,
  TvSeries,
  MediaPlayer,
  ProfilesPage,
} from "../pages";

import PrivateLayout from "../App";
import PrivateStandalone from "./PrivateStandalone";
import MediaDetail from "../components/MediaDetail/Index";
import Movie from "../pages/MediaPlayer/Movie";
import PageTest from "../pages/PageTest";
import EditingProfiles from "../pages/Profiles/Components/EditingProfiles";
import CreateNewProfilePage from "../pages/Profiles/Components/CreateProfile/CreateNewProfile";

const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentProfile = useSelector((state) => state.auth.currentProfile);

  const publicRoutes = [
    {
      path: "/",
      element: !isAuthenticated ? <Login /> : <Navigate to="/home" />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/home" /> : <Register />,
    },
  ];

  const privateRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/movies", element: <Movies /> },
    { path: "/detail/movie/:id", element: <Movie /> },
    { path: "/detail/tv/:key", element: <MediaDetail /> },
    { path: "/mediaplayer/:id", element: <MediaPlayer /> },
    { path: "/tv-series", element: <TvSeries /> },
    { path: "/pageTest", element: <PageTest /> },
  ];

  const privateStandalone = [
    { path: "/profiles", element: <ProfilesPage /> },
    { path: "/profiles/editing&profileId/:profileId", element: <EditingProfiles /> },
    { path: "/profiles/create", element: <CreateNewProfilePage/> },
  ];

  return (
    <BrowserRouter basename="/preview/suprime-video">
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route element={<PrivateLayout isAuthenticated={isAuthenticated} />}>
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={!currentProfile ? <Navigate to="/" /> : element}
            />
          ))}
        </Route>

        <Route
          element={<PrivateStandalone isAuthenticated={isAuthenticated} />}
        >
          {privateStandalone.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
