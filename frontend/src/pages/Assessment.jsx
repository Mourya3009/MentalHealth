import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import axios from 'axios';

const Assessment = () => {
  const [formData, setFormData] = useState({
    stressLevel: '',
    sleepQuality: '',
    mood: '',
    socialInteraction: '',
    academicPressure: ''
  });
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/assessment/submit', formData);
      
      if (response.data) {
        success('Assessment submitted successfully!');
        
        // Navigate to appropriate exercise page based on recommendation
        const exerciseType = response.data.exerciseType;
        navigate(`/exercises/${exerciseType}`);
      }
    } catch (err) {
      console.error('Assessment submission error:', err);
      error(err.response?.data?.message || 'Failed to submit assessment');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Mental Health
            <span className="block gradient-text">Assessment</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Take a moment to reflect on your current mental state. Your honest responses help us provide better support and personalized recommendations.
          </p>
        </div>

        <div className="card max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Stress Level */}
            <div>
              <label className="block text-lg font-medium text-white mb-4">
                How would you rate your current stress level?
              </label>
              <select
                name="stressLevel"
                value={formData.stressLevel}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select an option</option>
                <option value="5">Very Low</option>
                <option value="4">Low</option>
                <option value="3">Moderate</option>
                <option value="2">High</option>
                <option value="1">Very High</option>
              </select>
            </div>

            {/* Sleep Quality */}
            <div>
              <label className="block text-lg font-medium text-white mb-4">
                How would you rate your sleep quality?
              </label>
              <select
                name="sleepQuality"
                value={formData.sleepQuality}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select an option</option>
                <option value="1">Very Poor</option>
                <option value="2">Poor</option>
                <option value="3">Average</option>
                <option value="4">Good</option>
                <option value="5">Excellent</option>
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-lg font-medium text-white mb-4">
                How would you describe your current mood?
              </label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select an option</option>
                <option value="1">Very Negative</option>
                <option value="2">Negative</option>
                <option value="3">Neutral</option>
                <option value="4">Positive</option>
                <option value="5">Very Positive</option>
              </select>
            </div>

            {/* Social Interaction */}
            <div>
              <label className="block text-lg font-medium text-white mb-4">
                How comfortable are you with social interactions?
              </label>
              <select
                name="socialInteraction"
                value={formData.socialInteraction}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select an option</option>
                <option value="1">Very Uncomfortable</option>
                <option value="2">Uncomfortable</option>
                <option value="3">Neutral</option>
                <option value="4">Comfortable</option>
                <option value="5">Very Comfortable</option>
              </select>
            </div>

            {/* Academic Pressure */}
            <div>
              <label className="block text-lg font-medium text-white mb-4">
                How do you feel about your academic workload?
              </label>
              <select
                name="academicPressure"
                value={formData.academicPressure}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select an option</option>
                <option value="1">Overwhelming</option>
                <option value="2">Heavy</option>
                <option value="3">Manageable</option>
                <option value="4">Light</option>
                <option value="5">Very Light</option>
              </select>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="loading-spinner w-4 h-4"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Submit Assessment'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Your responses are confidential and will be used to provide personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;