import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <LoadingSpinner text="Checking authorization..." />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
