import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('token');

  // If authenticated, render the provided element (e.g., dashboard)
  // Otherwise, navigate to the login page
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default AuthGuard;
