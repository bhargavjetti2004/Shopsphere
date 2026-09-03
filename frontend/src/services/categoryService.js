import API from './api';

export const categoryService = {
  getCategories: async () => {
    const res = await API.get('/categories');
    return res.data;
  },

  getCategoryById: async (id) => {
    const res = await API.get(`/categories/${id}`);
    return res.data;
  },

  createCategory: async (data) => {
    const res = await API.post('/categories', data);
    return res.data;
  },

  updateCategory: async (id, data) => {
    const res = await API.put(`/categories/${id}`, data);
    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await API.delete(`/categories/${id}`);
    return res.data;
  }
};
