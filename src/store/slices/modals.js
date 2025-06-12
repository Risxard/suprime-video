import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

const initialState = {
    globalModal: null,
    filterModal: false,
    playerModal: false,
    focusModal: false,
};

const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        toggleFilterModal(state) {
            state.filterModal = !state.filterModal;
        },
        showPlayerModal(state) {
            state.playerModal = true;
        },
        hidePlayerModal(state) {
            state.playerModal = false;
        },
        showFocusModal(state) {
            state.focusModal = !state.focusModal;
        },
        setGlobalModal(state, action) {
            state.globalModal = action.payload;
        }
    },
});

export const { toggleFilterModal, showFocusModal, hidePlayerModal, showPlayerModal, setGlobalModal } = modalsSlice.actions;
export default modalsSlice.reducer;
