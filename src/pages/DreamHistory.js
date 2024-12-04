import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./navbar"; // Assuming your NavBar component is here

const DreamHistory = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching dreams

  useEffect(() => {
    const fetchDreams = async () => {
        try {
          const response = await fetch("/api/dreams", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Make sure the token is stored correctly
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch dreams");
          }
      
          const data = await response.json();
          setDreams(data); // Set the fetched dreams into state
        } catch (error) {
          console.error("Error fetching dreams:", error);
        }
      };
      

    fetchDreams(); // Call fetchDreams on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-gray-800 text-gray-100">
      <NavBar />

      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center mt-20 mb-4">Your Dream History</h1>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-8 h-8 mx-auto"></div>
            <p className="mt-2 text-blue-500">Loading dream history...</p>
          </div>
        ) : (
          <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            {dreams.length === 0 ? (
              <p className="text-center text-gray-500">No dreams found.</p>
            ) : (
              <ul>
                {dreams.map((dream, index) => (
                  <li key={index} className="mb-4 p-4 border-b border-gray-200">
                    <p className="text-lg">{dream.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(dream.date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-400">
          Powered by <span className="font-bold text-blue-500">Freudify</span>
        </p>
      </div>
    </div>
  );
};

export default DreamHistory;
