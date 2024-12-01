import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./navbar";

const Dashboard = () => {
  const { state } = useLocation();
  const { analysis } = state || {
    analysis: { summary: "No analysis data available", meaning: "N/A" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-gray-800 text-gray-100">
      {/* Navigation Bar */}
      <NavBar />

      <div className="container mx-auto py-10 px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-6">Dream Analysis</h1>

        <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          {/* Dream Summary Section */}
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Summary of Your Dream
          </h2>
          <p className="text-lg mb-6">{analysis.summary}</p>

          {/* Dream Meaning Section */}
          <h3 className="text-xl font-semibold mb-4 text-purple-700">Meaning</h3>
          <p className="text-lg">{analysis.meaning}</p>
        </div>

        {/* Footer Section */}
        <div className="mt-10 text-center">
          <p className="text-gray-400">
            Powered by <span className="font-bold text-blue-500">Freudify</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
