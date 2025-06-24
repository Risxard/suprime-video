import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token") || null,
  user: Cookies.get("user_uid") ? { uid: Cookies.get("user_uid") } : null,
  profiles: JSON.parse(localStorage.getItem("@AuthSV:profiles")) || [],
  currentProfile: JSON.parse(localStorage.getItem("@AuthSV:currentProfile")),
  watchList: JSON.parse(localStorage.getItem("@AuthSV:watchlist")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { token, user } = action.payload;

      Cookies.set("token", token, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
      });

      Cookies.set("user_uid", user.uid, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
      });

      state.token = token;
      state.user = user;

      if (!state.currentProfile) {
        const mainProfile = state.profiles.find(profile => profile.isMain);
        if (mainProfile) {
          localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(mainProfile));
          state.currentProfile = mainProfile;
        }
      }
    },
    logout(state) {
      localStorage.removeItem("@AuthFirebase:token");
      Cookies.remove("user_uid");
      Cookies.remove("token");
      localStorage.removeItem("@AuthSV:profiles");
      localStorage.removeItem("@AuthSV:currentProfile");
      localStorage.removeItem("@AuthSV:watchlist");
      state.token = null;
      state.user = null;
      state.profiles = [];
      state.currentProfile = null;
    },
    userProfiles(state, action) {
      localStorage.setItem("@AuthSV:profiles", JSON.stringify(action.payload.profiles));
      state.profiles = action.payload.profiles;
    },
    setCurrentProfile(state, action) {
      const currentProfile = state.profiles.find(profile => profile.id === action.payload.id);
      localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(currentProfile));
      state.currentProfile = state.profiles.find(profile => profile.id === action.payload.id);

      if (!currentProfile) {
        console.error("Profile not found");
        return;
      }
    },
    setCurrentWatchlist(state, action) {
      localStorage.setItem("@AuthSV:watchlist", JSON.stringify(action.payload));
      state.watchList = action.payload;
    },
    checkAuth(state) {
      const token = state.token;
      const user = state.user;
      if (token && user) {

      }
    }
  },
});

export const { loginSuccess, logout, checkAuth, userProfiles, setCurrentProfile, setCurrentWatchlist } = authSlice.actions;
export default authSlice.reducer;
