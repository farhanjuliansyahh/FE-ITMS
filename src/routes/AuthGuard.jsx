import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const AuthGuard = ({ element }) => {
//   const { isAuthenticated } = useAuth();
const isAuthenticated = localStorage.getItem("token")

  // If authenticated, render the provided element (e.g., dashboard)
  // Otherwise, navigate to the login page
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default AuthGuard;