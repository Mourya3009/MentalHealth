import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Submit mental health assessment
router.post("/submit", authenticateToken, async (req, res) => {
  try {
    const { stressLevel, sleepQuality, mood, socialInteraction, academicPressure } = req.body;

    // Validation
    if (!stressLevel || !sleepQuality || !mood || !socialInteraction || !academicPressure) {
      return res.status(400).json({ message: "All assessment fields are required" });
    }

    // Convert to numbers and validate range
    const scores = {
      stressLevel: parseInt(stressLevel),
      sleepQuality: parseInt(sleepQuality),
      mood: parseInt(mood),
      socialInteraction: parseInt(socialInteraction),
      academicPressure: parseInt(academicPressure)
    };

    // Validate score ranges (1-5)
    for (const [key, value] of Object.entries(scores)) {
      if (isNaN(value) || value < 1 || value > 5) {
        return res.status(400).json({ message: `Invalid ${key} score. Must be between 1 and 5.` });
      }
    }

    // Calculate average score
    const averageScore = (scores.stressLevel + scores.sleepQuality + scores.mood + scores.socialInteraction + scores.academicPressure) / 5;

    // Create assessment object
    const assessment = {
      ...scores,
      averageScore,
      timestamp: new Date()
    };

    // Update user with new assessment
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { 
          assessments: assessment,
          scores: averageScore 
        }
      },
      { new: true }
    );

    // Determine recommendation based on score
    let recommendation = "";
    let exerciseType = "";

    if (averageScore >= 4) {
      recommendation = "excellent";
      exerciseType = "congratulations";
    } else if (averageScore >= 3 && averageScore < 4) {
      recommendation = "good";
      exerciseType = "low";
    } else if (averageScore >= 2 && averageScore < 3) {
      recommendation = "moderate";
      exerciseType = "moderate";
    } else if (averageScore >= 1 && averageScore < 2) {
      recommendation = "needs_improvement";
      exerciseType = "improvement";
    } else {
      recommendation = "needs_attention";
      exerciseType = "confidence";
    }

    res.json({
      message: "Assessment submitted successfully",
      assessment,
      recommendation,
      exerciseType,
      averageScore
    });
  } catch (error) {
    console.error("Assessment submission error:", error);
    res.status(500).json({ message: "Server error during assessment submission" });
  }
});

// Get latest assessment
router.get("/latest", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('assessments');
    
    if (!user.assessments || user.assessments.length === 0) {
      return res.json({ message: "No assessments found" });
    }

    const latestAssessment = user.assessments[user.assessments.length - 1];
    res.json({ assessment: latestAssessment });
  } catch (error) {
    console.error("Get latest assessment error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get assessment statistics
router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('assessments scores');
    
    if (!user.assessments || user.assessments.length === 0) {
      return res.json({ 
        totalAssessments: 0,
        averageScore: 0,
        trend: "no_data"
      });
    }

    const totalAssessments = user.assessments.length;
    const averageScore = user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length;
    
    // Calculate trend (comparing last 3 assessments)
    let trend = "stable";
    if (user.scores.length >= 3) {
      const recent = user.scores.slice(-3);
      const first = recent[0];
      const last = recent[recent.length - 1];
      
      if (last > first + 0.5) {
        trend = "improving";
      } else if (last < first - 0.5) {
        trend = "declining";
      }
    }

    res.json({
      totalAssessments,
      averageScore: Math.round(averageScore * 100) / 100,
      trend,
      latestScore: user.scores[user.scores.length - 1]
    });
  } catch (error) {
    console.error("Get assessment stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
