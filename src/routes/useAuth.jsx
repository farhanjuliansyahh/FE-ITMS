import { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    // Implement your login logic here (e.g., API call to validate credentials)
    // Set isAuthenticated to true if login is successful
    console.log("login with username:",username, " and password:",password);
    setIsAuthenticated(true);
    localStorage.setItem("token","1234")
    // navigate("/")
    
  };

  const logout = () => {
    // Implement logout logic (e.g., clear tokens, reset state)
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};