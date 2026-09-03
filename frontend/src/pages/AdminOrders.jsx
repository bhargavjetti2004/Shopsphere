import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch platform orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading && orders.length === 0) return <LoadingSpinner text="Fetching customer orders..." />;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Customer Order Management</h1>
        <p style={{ color: 'var(--text-muted)' }}>Monitor order statuses and trigger delivery workflow transitions</p>
      </div>

      <ErrorMessage message={error} />

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Current Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>#{o.id.substring(0, 8)}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.userId}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{Number(o.totalAmount).toLocaleString('en-IN')}</td>
                  <td>{o.paymentMethod} ({o.paymentStatus})</td>
                  <td>
                    <span className={`status-tag status-${o.orderStatus.toLowerCase()}`}>
                      {o.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={o.orderStatus}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      disabled={updatingId === o.id || o.orderStatus === 'DELIVERED' || o.orderStatus === 'CANCELLED'}
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    >
                      <option value="PLACED">PLACED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
