import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './navbar';
import { useAuth } from './AuthContext'; // Import the AuthContext

const Home = () => {
  const [dream, setDream] = useState('');
  const { isAuthenticated } = useAuth(); // Get auth state
  const navigate = useNavigate();

  // Redirect to register if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/analyze', { dream });
      navigate('/dashboard', { state: { analysis: response.data } });
    } catch (error) {
      console.error('Error analyzing dream:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400">
      <NavBar />
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Dream Analysis
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="dreamInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your dream:
              </label>
              <textarea
                id="dreamInput"
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 resize-none"
                placeholder="Describe your dream in detail..."
                rows="6"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold shadow-md"
              >
                Analyze Dream
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
