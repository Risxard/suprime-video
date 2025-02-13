import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterModal: false,
};

const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        toggleFilterModal(state) {
            state.filterModal = !state.filterModal;
        },
    },
});

export const { toggleFilterModal } = modalsSlice.actions;
export default modalsSlice.reducer;
