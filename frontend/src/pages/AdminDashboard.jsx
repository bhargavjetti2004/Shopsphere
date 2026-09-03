import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, DollarSign, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { adminService } from '../services/adminService';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardMetrics()
      .then(setMetrics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner text="Loading admin analytics..." />;

  const statCards = [
    { title: 'Total Revenue', value: `₹${Number(metrics.totalRevenue).toLocaleString('en-IN')}`, icon: DollarSign, color: 'var(--accent)' },
    { title: 'Total Orders', value: metrics.totalOrders, icon: ShoppingBag, color: 'var(--primary)' },
    { title: 'Total Products', value: metrics.totalProducts, icon: Package, color: 'var(--secondary)' },
    { title: 'Total Users', value: metrics.totalUsers, icon: Users, color: '#3b82f6' },
    { title: 'Pending Orders', value: metrics.pendingOrders, icon: Clock, color: 'var(--warning)' },
    { title: 'Low Stock Items', value: metrics.lowStockProducts, icon: AlertTriangle, color: 'var(--danger)' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Overview of platform analytics & management shortcuts</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/products" className="btn btn-secondary btn-sm">Manage Products</Link>
          <Link to="/admin/categories" className="btn btn-secondary btn-sm">Manage Categories</Link>
          <Link to="/admin/orders" className="btn btn-secondary btn-sm">Manage Orders</Link>
          <Link to="/admin/users" className="btn btn-secondary btn-sm">Manage Users</Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)', color: card.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={28} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{card.title}</span>
                <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem' }}>{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Navigation */}
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Quick Management Modules</h3>
      <div className="grid-2">
        <Link to="/admin/products" className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Product Catalog & Inventory</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Add new items, upload images to Cloudinary, edit price and stock.</p>
          </div>
          <ArrowRight size={24} color="var(--primary)" />
        </Link>

        <Link to="/admin/orders" className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Customer Orders Management</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Review placed orders and transition order status to Confirmed/Shipped/Delivered.</p>
          </div>
          <ArrowRight size={24} color="var(--primary)" />
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
