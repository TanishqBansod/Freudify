import React, { useState } from "react";
import axios from "axios";
import NavBar from "./navbar"; // Adjust the import path as needed
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the AuthContext

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsAuthenticated } = useAuth(); // Access authentication state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
  
      // Rest of your existing code remains the same
      const { token } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setMessage("Registration failed. No token received.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-teal-300">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>
          {message && (
            <p className="text-center mb-4 text-red-600">
              {message}
            </p>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Register
            </button>
            <Link 
              to="/login"
              className="block py-2 px-2 text-teal-700 hover:text-black mt-4 text-center"
            >
              Already have an account? Click here to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
