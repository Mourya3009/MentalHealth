import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { username, age, standard } = req.body;
    
    const updateData = {};
    if (username) updateData.username = username;
    if (age) updateData.age = age;
    if (standard) updateData.standard = standard;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ 
      message: "Profile updated successfully",
      user 
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user assessment history
router.get("/assessments", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('assessments scores');
    res.json({ 
      assessments: user.assessments,
      scores: user.scores 
    });
  } catch (error) {
    console.error("Get assessments error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete user account
router.delete("/account", authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.clearCookie("token");
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
