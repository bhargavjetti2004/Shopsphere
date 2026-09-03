import API from './api';

export const adminService = {
  getDashboardMetrics: async () => {
    const res = await API.get('/admin/dashboard');
    return res.data;
  },

  getUsers: async () => {
    const res = await API.get('/admin/users');
    return res.data;
  },

  toggleUserStatus: async (id) => {
    const res = await API.put(`/admin/users/${id}/toggle-status`);
    return res.data;
  },

  getAllOrders: async () => {
    const res = await API.get('/admin/orders');
    return res.data;
  },

  updateOrderStatus: async (orderId, orderStatus) => {
    const res = await API.put(`/admin/orders/${orderId}/status`, { orderStatus });
    return res.data;
  }
};
