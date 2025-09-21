import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate progress plots using a simple HTML/SVG approach
router.get("/generate", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('scores assessments');
    
    if (!user.scores || user.scores.length === 0) {
      return res.status(400).json({ message: "No assessment data available for plotting" });
    }

    // Generate SVG plots
    const linePlotSVG = generateLinePlot(user.scores);
    const barPlotSVG = generateBarPlot(user.scores);
    
    // Save SVG files
    const staticDir = path.join(__dirname, '..', 'public', 'static');
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(staticDir, 'plot.svg'), linePlotSVG);
    fs.writeFileSync(path.join(staticDir, 'barplot.svg'), barPlotSVG);
    
    res.json({
      message: "Plots generated successfully",
      plots: {
        linePlot: "/static/plot.svg",
        barPlot: "/static/barplot.svg"
      },
      data: {
        scores: user.scores,
        totalAssessments: user.assessments.length
      }
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
        linePlot: "/static/plot.svg",
        barPlot: "/static/barplot.svg"
      }
    });
  } catch (error) {
    console.error("Get plot data error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Generate line plot SVG
function generateLinePlot(scores) {
  const width = 800;
  const height = 400;
  const padding = 60;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  
  const maxScore = 5;
  const minScore = 0;
  
  // Calculate points
  const points = scores.map((score, index) => {
    const x = padding + (index / (scores.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((score - minScore) / (maxScore - minScore)) * chartHeight;
    return { x, y };
  });
  
  // Create path for line
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  // Create SVG
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#a78bfa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f472b6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#1e293b" rx="8"/>
      
      <!-- Grid lines -->
      ${Array.from({length: 6}, (_, i) => {
        const y = padding + (i / 5) * chartHeight;
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#475569" stroke-width="1" opacity="0.3"/>`;
      }).join('')}
      
      ${Array.from({length: scores.length}, (_, i) => {
        const x = padding + (i / (scores.length - 1)) * chartWidth;
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#475569" stroke-width="1" opacity="0.3"/>`;
      }).join('')}
      
      <!-- Line plot -->
      <path d="${pathData}" stroke="url(#lineGradient)" stroke-width="3" fill="none"/>
      
      <!-- Data points -->
      ${points.map(point => 
        `<circle cx="${point.x}" cy="${point.y}" r="6" fill="#a78bfa" stroke="#ffffff" stroke-width="2"/>`
      ).join('')}
      
      <!-- Labels -->
      <text x="${width/2}" y="${height - 10}" text-anchor="middle" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="14" font-weight="bold">Assessment Number</text>
      <text x="15" y="${height/2}" text-anchor="middle" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="14" font-weight="bold" transform="rotate(-90, 15, ${height/2})">Mental Health Score</text>
      
      <!-- Y-axis labels -->
      ${Array.from({length: 6}, (_, i) => {
        const value = maxScore - (i / 5) * (maxScore - minScore);
        const y = padding + (i / 5) * chartHeight;
        return `<text x="${padding - 10}" y="${y + 5}" text-anchor="end" fill="#94a3b8" font-family="Arial, sans-serif" font-size="12">${value}</text>`;
      }).join('')}
      
      <!-- X-axis labels -->
      ${scores.map((_, i) => {
        const x = padding + (i / (scores.length - 1)) * chartWidth;
        return `<text x="${x}" y="${height - padding + 20}" text-anchor="middle" fill="#94a3b8" font-family="Arial, sans-serif" font-size="12">${i + 1}</text>`;
      }).join('')}
      
      <!-- Title -->
      <text x="${width/2}" y="30" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="18" font-weight="bold">Mental Health Trends Over Time</text>
    </svg>
  `;
  
  return svg;
}

// Generate bar plot SVG
function generateBarPlot(scores) {
  const width = 800;
  const height = 400;
  const padding = 60;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  
  // Calculate score distribution
  const scoreRanges = ['0-1', '1-2', '2-3', '3-4', '4-5'];
  const scoreCounts = [0, 0, 0, 0, 0];
  
  scores.forEach(score => {
    if (0 <= score < 1) scoreCounts[0]++;
    else if (1 <= score < 2) scoreCounts[1]++;
    else if (2 <= score < 3) scoreCounts[2]++;
    else if (3 <= score < 4) scoreCounts[3]++;
    else if (4 <= score <= 5) scoreCounts[4]++;
  });
  
  const maxCount = Math.max(...scoreCounts);
  const barWidth = chartWidth / scoreRanges.length * 0.8;
  const barSpacing = chartWidth / scoreRanges.length;
  
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
  
  // Create SVG
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#1e293b" rx="8"/>
      
      <!-- Grid lines -->
      ${Array.from({length: Math.max(maxCount + 1, 6)}, (_, i) => {
        const y = padding + chartHeight - (i / Math.max(maxCount, 5)) * chartHeight;
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#475569" stroke-width="1" opacity="0.3"/>`;
      }).join('')}
      
      <!-- Bars -->
      ${scoreRanges.map((range, i) => {
        const count = scoreCounts[i];
        const barHeight = maxCount > 0 ? (count / maxCount) * chartHeight : 0;
        const x = padding + i * barSpacing + (barSpacing - barWidth) / 2;
        const y = padding + chartHeight - barHeight;
        
        return `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${colors[i]}" opacity="0.8"/>
          ${count > 0 ? `<text x="${x + barWidth/2}" y="${y - 5}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold">${count}</text>` : ''}
        `;
      }).join('')}
      
      <!-- Labels -->
      <text x="${width/2}" y="${height - 10}" text-anchor="middle" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="14" font-weight="bold">Score Range</text>
      <text x="15" y="${height/2}" text-anchor="middle" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="14" font-weight="bold" transform="rotate(-90, 15, ${height/2})">Number of Assessments</text>
      
      <!-- Y-axis labels -->
      ${Array.from({length: Math.max(maxCount + 1, 6)}, (_, i) => {
        const value = Math.round((i / Math.max(maxCount, 5)) * maxCount);
        const y = padding + chartHeight - (i / Math.max(maxCount, 5)) * chartHeight;
        return `<text x="${padding - 10}" y="${y + 5}" text-anchor="end" fill="#94a3b8" font-family="Arial, sans-serif" font-size="12">${value}</text>`;
      }).join('')}
      
      <!-- X-axis labels -->
      ${scoreRanges.map((range, i) => {
        const x = padding + i * barSpacing + barSpacing / 2;
        return `<text x="${x}" y="${height - padding + 20}" text-anchor="middle" fill="#94a3b8" font-family="Arial, sans-serif" font-size="12">${range}</text>`;
      }).join('')}
      
      <!-- Title -->
      <text x="${width/2}" y="30" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="18" font-weight="bold">Mental Health Score Distribution</text>
    </svg>
  `;
  
  return svg;
}

export default router;