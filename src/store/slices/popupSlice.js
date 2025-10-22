import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  message: "",
  iconType: "done",
  persist: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopup: (state, action) => {
      const { message, iconType = "done", persist = false } = action.payload;
      state.visible = true;
      state.message = message;
      state.iconType = iconType;
      state.persist = persist;
    },
    hidePopup: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
