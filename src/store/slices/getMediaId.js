import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
};

const getIdSlice = createSlice({
    name: "getId",
    initialState,
    reducers: {
        setId(state, action) {
            state.id = action.payload.id;
        },
        extractIdFromUrl(state, action) {
            const url = action.payload.url;
            const match = url.match(/\/detail\/(movie|tv)\/(\d+)(?:\/|$)/);

            if (match) {
                state.id = parseInt(match[2], 10);
            } else {
                console.warn("URL inválida ou ID não encontrado:", url);
            }
        }
    },
});

export const { setId, extractIdFromUrl } = getIdSlice.actions;
export default getIdSlice.reducer;
