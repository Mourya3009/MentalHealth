import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const SelfAnalysis = () => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: ''
  });
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { success } = useToast();

  const questions = [
    {
      id: 'question1',
      text: 'How would you describe yourself in three words?',
      placeholder: 'e.g., creative, determined, friendly'
    },
    {
      id: 'question2',
      text: 'What do you think are your biggest strengths and weaknesses?',
      placeholder: 'Share your thoughts on what you do well and areas for growth'
    },
    {
      id: 'question3',
      text: 'How do you handle stress or difficult situations?',
      placeholder: 'Describe your coping mechanisms and strategies'
    },
    {
      id: 'question4',
      text: 'What is the biggest challenge you face in school?',
      placeholder: 'Tell us about academic, social, or personal challenges'
    },
    {
      id: 'question5',
      text: 'How do you usually make new friends?',
      placeholder: 'Describe your approach to building relationships'
    },
    {
      id: 'question6',
      text: 'What are your dreams or goals for the future?',
      placeholder: 'Share your aspirations and what motivates you'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Calculate progress
    const filledFields = Object.values({ ...formData, [name]: value }).filter(
      value => value.trim() !== ''
    ).length;
    setProgress((filledFields / questions.length) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    success('Thank you for your responses! Your self-analysis has been submitted successfully.');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: ''
      });
      setProgress(0);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Student
            <span className="block gradient-text">Self-Analysis</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Take a moment to reflect on yourself. Your honest responses help us provide better support.
          </p>
        </div>

        <div className="card">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">Progress</span>
              <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {questions.map((question, index) => (
                <div key={question.id}>
                  <label className="block text-lg font-medium text-white mb-4">
                    {index + 1}. {question.text}
                  </label>
                  <textarea
                    name={question.id}
                    value={formData[question.id]}
                    onChange={handleChange}
                    className="input-field min-h-24 resize-y"
                    placeholder={question.placeholder}
                    required
                  />
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Submit Analysis
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">✅</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Thank you for your responses!
              </h3>
              <p className="text-slate-300 text-lg">
                Your self-analysis has been submitted successfully. Take some time to reflect on your answers.
              </p>
            </div>
          )}

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

export default SelfAnalysis;