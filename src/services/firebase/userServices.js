import api from '../api.js';

export const userServices = {
    getUserData: async () => {
        const { data } = await api.get("/api/users");
        return data;
    },

};




