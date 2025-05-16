// components/PrivateRoute.js
import React from 'react';
import { getToken } from '../services/authService';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
