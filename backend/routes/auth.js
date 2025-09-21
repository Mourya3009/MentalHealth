import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const router = express.Router();

// Generate captcha
function generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
}

// Store captcha temporarily (in production, use Redis or similar)
const captchaStore = new Map();

// Get captcha for login
router.get("/captcha", (req, res) => {
  const captcha = generateCaptcha();
  const captchaId = Date.now().toString();
  captchaStore.set(captchaId, captcha);
  
  // Store captcha ID in cookie for 5 minutes
  res.cookie("captchaId", captchaId, { 
    maxAge: 5 * 60 * 1000, // 5 minutes
    httpOnly: true 
  });
  
  res.json({ captcha });
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, age, standard } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      age,
      standard
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, captcha } = req.body;

    // Validation
    if (!email || !password || !captcha) {
      return res.status(400).json({ message: "Email, password, and captcha are required" });
    }

    // Verify captcha
    const captchaId = req.cookies.captchaId;
    const storedCaptcha = captchaStore.get(captchaId);
    
    if (!storedCaptcha || storedCaptcha !== captcha) {
      return res.status(400).json({ message: "Captcha incorrect, try again" });
    }

    // Clear used captcha
    captchaStore.delete(captchaId);
    res.clearCookie("captchaId");

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
