import API from './api';

export const orderService = {
  createOrder: async (checkoutData) => {
    const res = await API.post('/orders', checkoutData);
    return res.data;
  },

  getOrders: async () => {
    const res = await API.get('/orders');
    return res.data;
  },

  getOrderById: async (id) => {
    const res = await API.get(`/orders/${id}`);
    return res.data;
  }
};
