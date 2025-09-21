import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate progress plots
router.get("/generate", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('scores assessments');
    
    if (!user.scores || user.scores.length === 0) {
      return res.status(400).json({ message: "No assessment data available for plotting" });
    }

    // Convert scores to string for Python script
    const scoresString = user.scores.join(',');
    
    // Path to the Python script
    const pythonScriptPath = path.join(__dirname, '..', 'scripts', 'plot.py');
    
    // Execute Python script to generate plots
    exec(`python "${pythonScriptPath}" "${scoresString}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('Python script error:', error);
        return res.status(500).json({ message: "Error generating plots" });
      }
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      // Return the paths to the generated plot images
      res.json({
        message: "Plots generated successfully",
        plots: {
          linePlot: "/static/plot.png",
          barPlot: "/static/barplot.png"
        },
        data: {
          scores: user.scores,
          totalAssessments: user.assessments.length
        }
      });
    });
  } catch (error) {
    console.error("Plot generation error:", error);
    res.status(500).json({ message: "Server error during plot generation" });
  }
});

// Get plot data without generating new plots
router.get("/data", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('scores assessments');
    
    if (!user.scores || user.scores.length === 0) {
      return res.json({ 
        message: "No assessment data available",
        scores: [],
        assessments: []
      });
    }

    // Calculate some basic statistics
    const averageScore = user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length;
    const highestScore = Math.max(...user.scores);
    const lowestScore = Math.min(...user.scores);
    
    // Calculate trend
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
      scores: user.scores,
      assessments: user.assessments,
      statistics: {
        totalAssessments: user.scores.length,
        averageScore: Math.round(averageScore * 100) / 100,
        highestScore,
        lowestScore,
        trend
      },
      plots: {
        linePlot: "/static/plot.png",
        barPlot: "/static/barplot.png"
      }
    });
  } catch (error) {
    console.error("Get plot data error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
