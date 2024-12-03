import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to login the user
  const login = (token) => {
    localStorage.setItem("authToken", token); // Save the token in localStorage
    setIsAuthenticated(true); // Update authentication state
  };

  // Function to logout the user
  const logout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    setIsAuthenticated(false); // Update authentication state
  };

  // Check if the user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // Set as authenticated if token exists
    } else {
      setIsAuthenticated(false); // Otherwise, set as not authenticated
    }
  }, []); // Runs once when the component mounts

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
