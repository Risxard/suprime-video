import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Login,
  Register,
  Home,
  Movies,
  TvSeries,
  DetailsPage,
  ProfilesPage,
  Categories,
  WatchlistPage,
  SettingsPage,
  Pagetest,
  ErrorPage,
  EmailVerificationPage,
  FortgetPasswordPage,
} from "../pages";

import PrivateLayout from "../App";
import PrivateStandalone from "./PrivateStandalone";

import EditingProfiles from "../pages/Profiles/Components/EditingProfiles";
import CreateNewProfilePage from "../pages/Profiles/Components/CreateProfile/CreateNewProfile";
import Search from "../pages/Search";

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
    {
      path: "/register/done",
      element: isAuthenticated ? <Navigate to="/home" /> : <EmailVerificationPage />,
    },
    {
      path: "/verify",
      element: isAuthenticated ? <Navigate to="/home" /> : <EmailVerificationPage />,
    },
    {
      path: "/verify:ref",
      element: isAuthenticated ? <Navigate to="/home" /> : <EmailVerificationPage />,
    },
    {
      path: "/forgot",
      element: isAuthenticated ? <Navigate to="/home" /> : <FortgetPasswordPage/>,
    },
    {
      path: "/forgot/:ref",
      element: isAuthenticated ? <Navigate to="/home" /> : <FortgetPasswordPage />,
    },
  ];

  const privateRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/movies", element: <Movies /> },
    { path: "/detail/:mediaType/:id/", element: <DetailsPage /> },
    { path: "/detail/:mediaType/:id/:referrer", element: <DetailsPage /> },

    { path: "/search/:searchKey", element: <Search /> },
    { path: "/categories/:genreId", element: <Categories /> },
    { path: "/tv-series", element: <TvSeries /> },
    { path: "/watchlist/:filterId", element: <WatchlistPage /> },
    { path: "/settings/:id", element: <SettingsPage /> },
    { path: "/settings/:id/:ref", element: <SettingsPage /> },
    { path: "/settings", element: <Navigate to="/settings/your-account" /> },
    { path: "/pagetest", element: <Pagetest /> },

  ];

  const privateStandalone = [
    { path: "/profiles", element: <ProfilesPage /> },
    {
      path: "/profiles/editing&profileId/:profileId",
      element: <EditingProfiles />,
    },
    { path: "/profiles/create", element: <CreateNewProfilePage /> },
  ];

  return (
    <BrowserRouter basename="/preview/acaiwaveplus">
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
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
