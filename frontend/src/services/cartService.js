import API from './api';

export const cartService = {
  getCart: async () => {
    const res = await API.get('/cart');
    return res.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const res = await API.post('/cart/items', { productId, quantity });
    return res.data;
  },

  updateQuantity: async (productId, quantity) => {
    const res = await API.put(`/cart/items/${productId}?quantity=${quantity}`);
    return res.data;
  },

  removeFromCart: async (productId) => {
    const res = await API.delete(`/cart/items/${productId}`);
    return res.data;
  },

  clearCart: async () => {
    const res = await API.delete('/cart');
    return res.data;
  }
};
