import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch registered users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      await adminService.toggleUserStatus(userId);
      loadUsers();
    } catch (err) {
      alert(err.message || 'Failed to toggle user status');
    }
  };

  if (loading && users.length === 0) return <LoadingSpinner text="Fetching user accounts..." />;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>User Management</h1>
        <p style={{ color: 'var(--text-muted)' }}>View registered customer and admin accounts</p>
      </div>

      <ErrorMessage message={error} />

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Account Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 700 }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || 'N/A'}</td>
                  <td>
                    <span style={{
                      fontWeight: 700, fontSize: '0.8rem',
                      color: u.role === 'ROLE_ADMIN' ? 'var(--warning)' : 'var(--primary)'
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-block', padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700,
                      background: u.enabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: u.enabled ? '#34d399' : '#f87171'
                    }}>
                      {u.enabled ? 'ACTIVE' : 'DISABLED'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`btn ${u.enabled ? 'btn-danger' : 'btn-primary'} btn-sm`}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    >
                      {u.enabled ? 'Disable Account' : 'Enable Account'}
                    </button>
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

export default AdminUsers;
