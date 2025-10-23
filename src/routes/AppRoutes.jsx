import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Identity,
  Home,
  DetailsPage,
  ProfilesPage,
  WatchlistPage,
  SettingsPage,
  ErrorPage,
  FortgetPasswordPage,
  PageTest,
  LandingPage,
  AccountPage,
} from "../pages/Index";

import PrivateLayout from "../App";
import PrivateStandalone from "./PrivateStandalone";

import Search from "../pages/Search";
import EmailSection from "../pages/Identity/components/EmailSection";
import PasswordSection from "../pages/Identity/components/PasswordSection";
import CreatePasswordSection from "../pages/Identity/components/CreatePasswordSection";
import EmailVerification from "../pages/Identity/components/EmailVerification";
import EditProfiles from "../pages/Profiles/Components/EditProfiles";
import LoadingPage from "../components/utils/LoadingPage/index.jsx";
import SelectProfile from "../pages/Profiles/Components/SelectProfile";
import EditProfile from "../pages/Profiles/Components/EditProfile/EditProfile";
import SelectAvatar from "../pages/Profiles/Components/SelectAvatar/SelectAvatar";
import AddProfile from "../pages/Profiles/Components/AddProfile/AddProfile";
import BrowsePage from "../pages/BrowsePage";
import MoviesPage from "../pages/MoviesPage/index.jsx";
import TvSeriesPage from "../pages/TvSeriesPage/index.jsx";
import PopUpMessage from "../components/PopUpMessage/index.jsx";
import ChangePassword from "../pages/Identity/components/ChangePassword.jsx";
import DeleteAccount from "../pages/Identity/components/DeleteAccount.jsx";

const AppRoutes = () => {
  const { user, token, currentProfile, loading } = useSelector(
    (state) => state.auth
  );
  const isAuthenticated = !!user && !!token;

  if (loading) {
    return <LoadingPage />;
  }

  const publicRoutes = [
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/home" /> : <LandingPage />,
    },
    {
      path: "/landing",
      element: isAuthenticated ? <Navigate to="/home" /> : <LandingPage />,
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
      path: "/identity/update-credentials/change-password",
      element: <Identity children={<ChangePassword />} updatePage={true} />,
    },
    {
      path: "/identity/update-credentials/enter-email",
      element: isAuthenticated ? (
        <Navigate to="/identity/update-credentials/change-password" />
      ) : (
        <Identity children={<EmailSection />} />
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
      path: "/*",
      element: !isAuthenticated ? <Navigate to="/" /> : <ErrorPage />,
    },
  ];

  const privateRoutes = [
    { path: "/home", element: <Home /> },
    {
      path: "/browse/movies",
      element: <BrowsePage children={<MoviesPage />} />,
    },
    {
      path: "/browse/series",
      element: <BrowsePage children={<TvSeriesPage />} />,
    },

    { path: "/detail/:mediaType/:id/", element: <DetailsPage /> },
    { path: "/detail/:mediaType/:id/:referrer", element: <DetailsPage /> },

    { path: "/search", element: <Search /> },

    {
      path: "/browse/watchlist/",
      element: <BrowsePage children={<WatchlistPage />} />,
    },
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
    { path: "/settings/account", element: <AccountPage /> },
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
    {
      path: "/add-profile",
      element: <ProfilesPage children={<AddProfile />} />,
    },
    {
      path: "/identity/delete-account/confirm-deletion",
      element: isAuthenticated ? (
        <Identity children={<DeleteAccount />} updatePage={true} />
      ) : (
        <Navigate to="/" />
      ),
    },
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
              element={
                !currentProfile ? <Navigate to="/select-profile" /> : element
              }
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
      <PopUpMessage />
    </BrowserRouter>
  );
};

export default AppRoutes;
