import axios from "axios";
import cors from "cors";
// Set your OpenAI API key here
const apiKey = "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";

// Define the API endpoint
const apiUrl = "https://api.openai.com/v1/chat/completions";

async function getAnswerToQuestion() {
  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: "What is the summary of $(barbie) in 50 words",
        model: "text-davinci-002",
        max_tokens: 50, // Adjust this to control the response length
        n: 1, // Number of responses to generate
        stop: "\n" // Specify a stopping criterion (e.g., '\n' to stop at a newline)
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Get the generated response  
    const answer = response.data.choices[0].text.trim();
    console.log("Answer:", answer);
    return answer;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to get the answer
export default getAnswerToQuestion; // Export the function
