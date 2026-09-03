import API from './api';

export const authService = {
  login: async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
  },

  getProfile: async () => {
    const res = await API.get('/users/profile');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await API.put('/users/profile', data);
    return res.data;
  }
};
