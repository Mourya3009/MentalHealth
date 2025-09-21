import React, { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import axios from 'axios';

const URL = 'http://localhost:5000/static';
const Progress = () => {
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { error, success } = useToast();

  useEffect(() => {
    fetchPlotData();
  }, []);

  const fetchPlotData = async () => {
    try {
      const response = await axios.get('/api/plot/data');
      setPlotData(response.data);
    } catch (err) {
      console.error('Error fetching plot data:', err);
      error('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const generatePlots = async () => {
    setGenerating(true);
    try {
      await axios.get('/api/plot/generate');
      success('Plots generated successfully!');
      // Refresh the data
      await fetchPlotData();
    } catch (err) {
      console.error('Error generating plots:', err);
      error('Failed to generate plots');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Progress
            <span className="block gradient-text">Analytics</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Track your mental health journey with detailed insights and visualizations
          </p>
        </div>

        {/* Statistics Overview */}
        {plotData && plotData.statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Assessments</p>
                  <p className="text-2xl font-bold text-white">{plotData.statistics.totalAssessments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white">{plotData.statistics.averageScore}/5</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Highest Score</p>
                  <p className="text-2xl font-bold text-white">{plotData.statistics.highestScore}/5</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Trend</p>
                  <div className="flex items-center space-x-2">
                    {plotData.statistics.trend === 'improving' ? (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    ) : plotData.statistics.trend === 'declining' ? (
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    )}
                    <span className="text-sm text-slate-300 capitalize">{plotData.statistics.trend}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Plots Button */}
        <div className="text-center mb-8">
          <button
            onClick={generatePlots}
            disabled={generating}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <div className="flex items-center space-x-2">
                <div className="loading-spinner w-4 h-4"></div>
                <span>Generating Plots...</span>
              </div>
            ) : (
              'Generate New Plots'
            )}
          </button>
        </div>

        {/* Plots Section */}
        <div className="space-y-8">
          {/* Line Plot */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center space-x-3">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <span>Mental Health Trends</span>
            </h2>
            <div className="flex justify-center items-center min-h-96 bg-slate-800/30 rounded-xl border border-slate-700">
              <img
                // src="http://localhost:5000/static/plot.png"
                src={URL + '/plot.png'}
                alt="Mental Health Trends"
                className="max-w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden flex-col items-center justify-center text-slate-400">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>Chart not available</p>
                <p className="text-sm mt-2">Take more assessments to generate charts</p>
              </div>
            </div>
          </div>

          {/* Bar Plot */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center space-x-3">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Mental Health Distribution</span>
            </h2>
            <div className="flex justify-center items-center min-h-96 bg-slate-800/30 rounded-xl border border-slate-700">
              <img
                // src="http://localhost:5000/static/barplot.png"
                src={URL + '/barplot.png'}
                alt="Mental Health Distribution"
                className="max-w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden flex-col items-center justify-center text-slate-400">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>Chart not available</p>
                <p className="text-sm mt-2">Take more assessments to generate charts</p>
              </div>
            </div>
          </div>
        </div>

        {/* No Data Message */}
        {plotData && (!plotData.scores || plotData.scores.length === 0) && (
          <div className="card text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Assessment Data</h3>
            <p className="text-slate-400 mb-4">
              You haven't taken any assessments yet. Take your first assessment to start tracking your progress.
            </p>
            <a href="/assessment" className="btn-primary">
              Take Assessment
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;