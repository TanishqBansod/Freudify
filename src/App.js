import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DreamHistory from "./pages/DreamHistory"; // Import the DreamHistory page
import { AuthProvider, useAuth } from "./pages/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth(); // Fetch authentication status from context

  return (
    <Routes>
      {/* Redirect to login page if not authenticated */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />

      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
      />

      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Only show Dream History page if authenticated */}
      <Route
        path="/dream-history"
        element={isAuthenticated ? <DreamHistory /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
