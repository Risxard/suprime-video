import { createSlice } from '@reduxjs/toolkit';
import { useTranslation } from "react-i18next";
import i18n from '../../i18n';

const lang = i18n.language;

const initialState = {
    language: lang,
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