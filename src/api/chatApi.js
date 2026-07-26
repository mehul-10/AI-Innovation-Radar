import axios from "axios";

export const askAI = async (question, analysis) => {
  const response = await axios.post(
    "http://localhost:8000/chat",
    {
      question,
      analysis
    }
  );

  return response.data;
};