import API from './api';

export const wishlistService = {
  getWishlist: async () => {
    const res = await API.get('/wishlist');
    return res.data;
  },

  addToWishlist: async (productId) => {
    const res = await API.post(`/wishlist/${productId}`);
    return res.data;
  },

  removeFromWishlist: async (productId) => {
    const res = await API.delete(`/wishlist/${productId}`);
    return res.data;
  }
};
