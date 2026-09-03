import API from './api';

export const productService = {
  getProducts: async (params = {}) => {
    const res = await API.get('/products', { params });
    return res.data;
  },

  getProductById: async (id) => {
    const res = await API.get(`/products/${id}`);
    return res.data;
  },

  getFeaturedProducts: async () => {
    const res = await API.get('/products/featured');
    return res.data;
  },

  getRelatedProducts: async (id, category) => {
    const res = await API.get(`/products/${id}/related`, { params: { category } });
    return res.data;
  },

  createProduct: async (productData) => {
    const res = await API.post('/products', productData);
    return res.data;
  },

  updateProduct: async (id, productData) => {
    const res = await API.put(`/products/${id}`, productData);
    return res.data;
  },

  deleteProduct: async (id) => {
    const res = await API.delete(`/products/${id}`);
    return res.data;
  },

  uploadProductImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await API.post('/products/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};
