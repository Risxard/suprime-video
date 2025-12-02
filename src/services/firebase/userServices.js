import api from '../config/apiConfig';

export const userServices = {
  getUserData: async () => {
    const { data } = await api.get('/api/users');
    return data;
  },

  deleteUser: async () => {
    const { data } = await api.delete('/api/users');
    return data;
  },
};
