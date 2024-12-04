import React, { useState } from "react";
import NavBar from "./navbar"; // Assuming your NavBar component is here
import analyzeDream from "./test"; // Import the helper function

const Dashboard = () => {
  const [dreamText, setDreamText] = useState(""); // Input state for dream text
  const [analysisResult, setAnalysisResult] = useState(""); // State to store the API result
  const [loading, setLoading] = useState(false); // New state to track loading status

  // Function to bold text wrapped in asterisks (*) and remove asterisks
  const formatText = (text) => {
    return text.replace(/\*(.*?)\*/g, (match, p1) => {
      // Remove the asterisks and return the bolded text without any additional characters like colons
      return `<strong>${p1}</strong>`;
    });
  };
  

  // Handler for the "Analyze Dream" button
  const handleAnalyzeDream = async () => {
    setLoading(true); // Set loading to true when the request starts

    try {
      const result = await analyzeDream(dreamText); // Call the API with the input
      console.log("Generated Content:", result); // Log the result
      // Format the result to bold text where necessary
      const formattedResult = formatText(result);
      setAnalysisResult(formattedResult); // Save the formatted result to state
    } catch (error) {
      console.error("Error analyzing dream:", error.message);
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-gray-800 text-gray-100">
      {/* Navigation Bar */}
      <NavBar />

      <div className="container mx-auto py-10 px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mt-20 mb-4">Dream Analysis</h1>

        <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          {/* Dream Input Section */}
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Analyze Your Dream</h2>
          <textarea
            className="w-full p-3 border rounded mb-4"
            placeholder="Type your dream here..."
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAnalyzeDream}
          >
            Analyze Dream
          </button>

          {/* Loading Animation */}
          {loading && (
            <div className="mt-4 text-center">
              <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-8 h-8 mx-auto"></div>
              <p className="mt-2 text-blue-500">Analyzing...</p>
            </div>
          )}

          {/* Display Analysis Result */}
          {analysisResult && !loading && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Analysis Result</h3>
              {/* Render formatted HTML content */}
              <p className="text-lg" dangerouslySetInnerHTML={{ __html: analysisResult }} />
            </div>
          )}
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
