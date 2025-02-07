import { createSlice } from '@reduxjs/toolkit';

const currentProfile = JSON.parse(localStorage.getItem("@AuthSV:currentProfile"));

const initialState = {
    language: "en-us",
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload.language;
            const updatedProfile = { ...currentProfile, language: action.payload.language };
            localStorage.setItem("@AuthSV:currentProfile", JSON.stringify(updatedProfile));
        }
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;