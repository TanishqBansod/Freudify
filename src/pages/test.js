import axios from 'axios'; // Use 'import' for consistency with React

// Function to call the Gemini API
const analyzeDream = async (dreamText) => {
  const apiKey = 'AIzaSyBPkKT5lczvRzwVS3B-dDyc_tPggJg3DxE';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: 'I had a dream. Here it is: '+dreamText+'So, tell me, what does this mean psychologically? Also, make sure to respond WITH NO ASTRIEKS', // Use the prompt text passed to this function
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Debugging the full response to check structure
    console.log('Full API Response:', response.data);

    // Safely extract the text from the response
    const contentText = response.data.candidates[0]?.content?.parts[0]?.text;
    
    // If content is found, return it, otherwise return a default message
    return contentText || "No content returned"; 

  } catch (error) {
    throw new Error(`API error: ${error.message}`);
  }
};

export default analyzeDream;
