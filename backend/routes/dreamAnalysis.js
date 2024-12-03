const express = require("express");
const axios = require("axios");
const router = express.Router();

// POST endpoint to handle dream analysis
router.post("/analyze", async (req, res) => {
  const { dream } = req.body;

  try {
    // Step 1: Summarize the dream
    const summarizationResponse = await axios.post("YOUR_SUMMARIZATION_API_ENDPOINT", {
      text: dream,
    });
    const summarizedDream = summarizationResponse.data.summary;

    // Step 2: Analyze the summarized dream
    const analysisResponse = await axios.post("YOUR_ANALYSIS_API_ENDPOINT", {
      text: summarizedDream,
    });
    const analysisResult = analysisResponse.data.analysis;

    // Step 3: Interpret the analysis
    const interpretationResponse = await axios.post("YOUR_INTERPRETATION_API_ENDPOINT", {
      analysis: analysisResult,
    });
    const interpretation = interpretationResponse.data.interpretation;

    res.status(200).json({
      summary: summarizedDream,
      analysis: analysisResult,
      interpretation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during analysis." });
  }
});

module.exports = router;
