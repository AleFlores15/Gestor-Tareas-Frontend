
// components/PrivateRoute.js
import React from 'react';
import { getToken } from '../services/authService';
import Unauthorized from '../pages/Unauthorized';

const PrivateRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Unauthorized />;
  }

  return children;
};

export default PrivateRoute;
