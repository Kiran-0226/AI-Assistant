import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-3-flash-preview";

export const runChat = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in .env file");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
};