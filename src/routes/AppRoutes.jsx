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
  ErrorPage,
  EmailVerificationPage,
  FortgetPasswordPage,
  PageTest,
} from "../pages/Index";

import PrivateLayout from "../App";
import PrivateStandalone from "./PrivateStandalone";

import EditingProfiles from "../pages/Profiles/Components/EditingProfiles";
import CreateNewProfilePage from "../pages/Profiles/Components/CreateProfile/CreateNewProfile";
import Search from "../pages/Search";

const AppRoutes = () => {
  const { user, token, currentProfile, loading } = useSelector((state) => state.auth);
  const isAuthenticated = !!user && !!token;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-bold">
        Carregando...
      </div>
    );
  }

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
      element: isAuthenticated ? <Navigate to="/" /> : <EmailVerificationPage />,
    },
    {
      path: "/verify",
      element: isAuthenticated ? <Navigate to="/" /> : <EmailVerificationPage />,
    },
    {
      path: "/verify:ref",
      element: isAuthenticated ? <Navigate to="/" /> : <EmailVerificationPage />,
    },
    {
      path: "/forgot",
      element: isAuthenticated ? <Navigate to="/" /> : <FortgetPasswordPage />,
    },
    {
      path: "/forgot/:ref",
      element: isAuthenticated ? <Navigate to="/" /> : <FortgetPasswordPage />,
    },
    {
      path: "/*",
      element: !isAuthenticated ? <Navigate to="/" /> : <ErrorPage />,
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
    {
      path: "/settings",
      element: <Navigate to="/settings/your-account/:ref" />,
    },
    { path: "/pagetest", element: <PageTest /> },
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

        {/* Rotas privadas com Layout */}
        <Route element={<PrivateLayout isAuthenticated={isAuthenticated} />}>
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={!currentProfile ? <Navigate to="/profiles" /> : element}
            />
          ))}
        </Route>

        {/* Rotas privadas standalone */}
        <Route element={<PrivateStandalone isAuthenticated={isAuthenticated} />}>
          {privateStandalone.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
