import API from './api';

export const reviewService = {
  getProductReviews: async (productId) => {
    const res = await API.get(`/products/${productId}/reviews`);
    return res.data;
  },

  addReview: async (productId, reviewData) => {
    const res = await API.post(`/products/${productId}/reviews`, reviewData);
    return res.data;
  }
};
