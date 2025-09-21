import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini AI
if (!process.env.GEMINI_API_KEY) {
  console.error("Missing Gemini API Key in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat with AI assistant
router.post("/chat", authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ message: "Message is required" });
    }

    const prompt = `
You are a kind and empathetic mental health assistant for students.

Student says: "${message}"

Your response must:
1. Start with a positive or calming suggestion (breathing, walk, music, journaling, etc.)
2. Include a light-hearted, clean joke or fun tip to lift mood (if appropriate)
3. If the student sounds severely anxious or depressed, recommend talking to a counselor or professional.

Be concise, warm, and non-judgmental. Keep your response under 200 words.
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    if (!response || response.trim().length === 0) {
      throw new Error("Empty response from AI");
    }

    res.json({
      message: "AI response generated successfully",
      userMessage: message,
      aiResponse: response.trim()
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ 
      message: "Sorry, something went wrong. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Get conversation suggestions
router.get("/suggestions", authenticateToken, (req, res) => {
  const suggestions = [
    "I'm feeling anxious about my exams",
    "I'm having trouble sleeping lately",
    "I feel lonely and isolated",
    "I'm stressed about my future",
    "I'm having relationship problems",
    "I feel overwhelmed with school work",
    "I'm struggling with self-confidence",
    "I feel sad and don't know why",
    "I'm having family issues",
    "I feel like I'm not good enough"
  ];

  res.json({ suggestions });
});

export default router;
