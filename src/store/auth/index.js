import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("@AuthFirebase:token"),
  token: localStorage.getItem("@AuthFirebase:token") || null,
  user: JSON.parse(localStorage.getItem("@AuthFirebase:user")) || null,
  profiles: JSON.parse(localStorage.getItem("@AuthSV:profiles")) || [],
  currentProfile: JSON.parse(localStorage.getItem("@AuthSV:currentProfile")),
  watchList: JSON.parse(localStorage.getItem("@AuthSV:watchlist")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("@AuthFirebase:token", action.payload.token);
      localStorage.setItem("@AuthFirebase:user", JSON.stringify(action.payload.user.uid));

      if (!state.currentProfile) {
        const mainProfile = state.profiles.find(profile => profile.isMain);
        if (mainProfile) {
          localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(mainProfile));
          state.currentProfile = mainProfile;
        }
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.profiles = [];
      state.currentProfile = null;
      localStorage.removeItem("@AuthFirebase:token");
      localStorage.removeItem("@AuthFirebase:user");
      localStorage.removeItem("@AuthSV:profiles");
      localStorage.removeItem("@AuthSV:currentProfile");
      localStorage.removeItem("@AuthSV:watchlist");
    },
    userProfiles(state, action) {
      state.profiles = action.payload.profiles;
      localStorage.setItem("@AuthSV:profiles", JSON.stringify(action.payload.profiles));
    },
    setCurrentProfile(state, action) {
      const currentProfile = state.profiles.find(profile => profile.id === action.payload.id);

      if (!currentProfile) {
        console.error("Profile not found");
        return;
      }
      localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(currentProfile));

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
