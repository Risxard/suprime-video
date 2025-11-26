import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Identity,
  Home,
  DetailsPage,
  ProfilesPage,
  WatchlistPage,
  ErrorPage,
  LandingPage,
  AccountPage,
  LegalPage,
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
import ChannelsPage from "../pages/ChannelsPage/index.jsx";
import ScrollToTop from "../components/utils/ScrollToTop.jsx";
import TestPage from "../pages/TestPage/TestPage.jsx";


const PublicRoute = ({ element, isAuthenticated, isGuest, path }) => {


  if (isAuthenticated && !isGuest) {
    return <Navigate to="/home" />;
  }


  const isLanding = path === "/" || path === "/landing";
  if (isGuest && isLanding) {
    return <Navigate to="/home" />;
  }


  return element;
};


const PrivateRoute = ({ element, isGuest, isAuthenticated, currentProfile }) => {
  if (!isAuthenticated) return <Navigate to="/" />;
  if (isGuest) return element;
  if (!currentProfile) return <Navigate to="/select-profile" />;
  return element;
};

const PrivateStandaloneRoute = ({ element, isAuthenticated, isGuest }) => {
  if (!isAuthenticated) return <Navigate to="/" />;
  if (isGuest) return <Navigate to="/home" />;
  return element;
};


const AppRoutes = () => {
  const { user, token, currentProfile, loading } = useSelector(
    (state) => state.auth
  );

  const isAuthenticated = !!user && !!token;
  const isGuest = user?.isAnonymous === true;

  if (loading) {
    return <LoadingPage />;
  }


  const publicRoutes = [
    { path: "/", element: <LandingPage /> },
    { path: "/landing", element: <LandingPage /> },


    { path: "/identity/login/enter-email", element: <Identity children={<EmailSection />} /> },
    { path: "/identity/login/enter-password", element: <Identity children={<PasswordSection />} /> },
    { path: "/identity/login/verify-email", element: <Identity children={<EmailVerification />} /> },
    { path: "/identity/sign-up/enter-email", element: <Identity children={<EmailSection />} /> },
    { path: "/identity/sign-up/create-password", element: <Identity children={<CreatePasswordSection />} /> },


    { path: "/identity/update-credentials/change-password", element: <Identity children={<ChangePassword />} updatePage={true} /> },
    { path: "/identity/update-credentials/enter-email", element: <Identity children={<EmailSection />} /> },

    { path: "/legal/:id", element: <LegalPage /> },
    { path: "/*", element: <ErrorPage /> },
  ];


  const privateRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/browse/movies", element: <BrowsePage children={<MoviesPage />} /> },
    { path: "/browse/series", element: <BrowsePage children={<TvSeriesPage />} /> },
    { path: "/detail/:mediaType/:id", element: <DetailsPage /> },
    { path: "/detail/:mediaType/:id/:referrer", element: <DetailsPage /> },
    { path: "/search", element: <Search /> },
    { path: "/browse/watchlist", element: <BrowsePage children={<WatchlistPage />} /> },
    { path: "/browse/:channelId", element: <BrowsePage children={<ChannelsPage />} /> },
    { path: "/testpage", element: <TestPage /> },
  ];


  const privateStandalone = [
    { path: "/select-profile", element: <ProfilesPage children={<SelectProfile />} /> },
    { path: "/settings/account", element: <AccountPage /> },
    { path: "/edit-profiles", element: <ProfilesPage children={<EditProfiles />} /> },
    { path: "/edit-profile/:profileId", element: <ProfilesPage children={<EditProfile />} /> },
    { path: "/select-avatar", element: <ProfilesPage children={<SelectAvatar />} /> },
    { path: "/select-avatar/:profileId", element: <ProfilesPage children={<SelectAvatar />} /> },
    { path: "/add-profile", element: <ProfilesPage children={<AddProfile />} /> },
    { path: "/identity/delete-account/confirm-deletion", element: <Identity children={<DeleteAccount />} updatePage={true} /> },
  ];


  return (
    <BrowserRouter basename="/preview/acaiwaveplus">
      <Routes>


        {publicRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <PublicRoute
                path={path}
                element={element}
                isAuthenticated={isAuthenticated}
                isGuest={isGuest}
              />
            }
          />
        ))}


        <Route element={<PrivateLayout isAuthenticated={isAuthenticated} />}>
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute
                  element={element}
                  isGuest={isGuest}
                  isAuthenticated={isAuthenticated}
                  currentProfile={currentProfile}
                />
              }
            />
          ))}
        </Route>


        <Route element={<PrivateStandalone isAuthenticated={isAuthenticated} />}>
          {privateStandalone.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateStandaloneRoute
                  element={element}
                  isAuthenticated={isAuthenticated}
                  isGuest={isGuest}
                />
              }
            />
          ))}
        </Route>

      </Routes>

      <PopUpMessage />
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default AppRoutes;
