import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const askAI = async (question, analysis) => {
  const response = await axios.post(
    `${API_URL}chat`,
    {
      question,
      analysis,
    }
  );

  return response.data;
};