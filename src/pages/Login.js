import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import NavBar from "./navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log('======== FRONTEND LOGIN ATTEMPT ========');
      console.log('Sending Email:', email);
      console.log('Sending Password:', password);
  
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('FULL LOGIN RESPONSE:', response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error('======== FRONTEND LOGIN ERROR ========');
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          {message && (
            <p className="text-center mb-4 text-red-600">
              {message}
            </p>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
