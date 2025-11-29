import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  profiles: JSON.parse(localStorage.getItem("@AuthSV:profiles")) || [],
  currentProfile: JSON.parse(localStorage.getItem("@AuthSV:currentProfile")) || null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      if (!state.currentProfile) {
        const mainProfile = state.profiles.find((profile) => profile.isMain);
        if (mainProfile) {
          localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(mainProfile));
          state.currentProfile = mainProfile;
        }
      }

      state.loading = false;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      state.profiles = [];
      state.currentProfile = null;
      state.watchList = [];
      state.loading = false;
    },

    userProfiles(state, action) {
      localStorage.setItem("@AuthSV:profiles", JSON.stringify(action.payload.profiles));
      state.profiles = action.payload.profiles;
    },

    setCurrentProfile(state, action) {

      const currentProfile = state.profiles.find(
        (profile) => profile.id === action.payload.id
      );

      if (currentProfile) {
        localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(currentProfile));
        state.currentProfile = currentProfile;
      } else {
        console.error("Profile not found");
      }
    },

  },
});

export const {
  loginSuccess,
  logout,
  userProfiles,
  setCurrentProfile,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
