import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    min: 13,
    max: 100
  },
  standard: {
    type: String,
    trim: true
  },
  scores: [{
    type: Number,
    min: 0,
    max: 5
  }],
  assessments: [{
    stressLevel: { type: Number, min: 1, max: 5 },
    sleepQuality: { type: Number, min: 1, max: 5 },
    mood: { type: Number, min: 1, max: 5 },
    socialInteraction: { type: Number, min: 1, max: 5 },
    academicPressure: { type: Number, min: 1, max: 5 },
    averageScore: { type: Number, min: 0, max: 5 },
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
