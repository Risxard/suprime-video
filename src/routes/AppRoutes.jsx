import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Identity,
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

import Search from "../pages/Search";
import EmailSection from "../pages/Identity/components/EmailSection";
import PasswordSection from "../pages/Identity/components/PasswordSection";
import CreatePasswordSection from "../pages/Identity/components/CreatePasswordSection";
import EmailVerification from "../pages/Identity/components/EmailVerification";
import EditProfiles from "../pages/Profiles/Components/EditProfiles";
import LoadingComponent from "../components/utils/LoadingComponent/LoadingComponent";
import SelectProfile from "../pages/Profiles/Components/SelectProfile";
import EditProfile from "../pages/Profiles/Components/EditProfile/EditProfile";
import SelectAvatar from "../pages/Profiles/Components/SelectAvatar/SelectAvatar";
import AddProfile from "../pages/Profiles/Components/AddProfile/AddProfile";

const AppRoutes = () => {
  const { user, token, currentProfile, loading } = useSelector(
    (state) => state.auth
  );
  const isAuthenticated = !!user && !!token;

  if (loading) {
    return <LoadingComponent />;
  }

  const publicRoutes = [
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <Navigate to="/identity/login/enter-email" />
      ),
    },
    {
      path: "/identity/login/enter-email",
      element: isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <Identity children={<EmailSection />} />
      ),
    },
    {
      path: "/identity/login/enter-password",
      element: isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <Identity children={<PasswordSection />} />
      ),
    },
    {
      path: "/identity/login/verify-email",
      element: isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <Identity children={<EmailVerification />} />
      ),
    },
    {
      path: "/identity/sign-up/enter-email",
      element: isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <Identity children={<EmailSection />} />
      ),
    },
    {
      path: "/identity/sign-up/create-password",
      element: isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <Identity children={<CreatePasswordSection />} />
      ),
    },
    {
      path: "/identity/sign-up/successful",
      element: isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <EmailVerificationPage />
      ),
    },
    {
      path: "/verify",
      element: isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <EmailVerificationPage />
      ),
    },
    {
      path: "/verify:ref",
      element: isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <EmailVerificationPage />
      ),
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
    {
      path: "/select-profile",
      element: <ProfilesPage children={<SelectProfile />} />,
    },
    {
      path: "/edit-profiles",
      element: <ProfilesPage children={<EditProfiles />} />,
    },
    {
      path: "/edit-profile/:profileId",
      element: <ProfilesPage children={<EditProfile />} />,
    },
    {
      path: "/select-avatar/",
      element: <ProfilesPage children={<SelectAvatar />} />,
    },
    {
      path: "/select-avatar/:profileId",
      element: <ProfilesPage children={<SelectAvatar />} />,
    },
    { path: "/add-profile", element: <ProfilesPage children={<AddProfile />} /> },
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
              element={!currentProfile ? <Navigate to="/select-profile" /> : element}
            />
          ))}
        </Route>

        {/* Rotas privadas standalone */}
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
