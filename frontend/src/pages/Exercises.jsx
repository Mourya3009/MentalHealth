import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Exercises = () => {
  const { type } = useParams();

  const getExerciseContent = () => {
    switch (type) {
      case 'congratulations':
        return {
          title: 'Congratulations! 🎉',
          subtitle: 'Your mental health assessment shows that you\'re in a great position to focus on your studies!',
          content: (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-4">Keep Up the Good Work!</h2>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-4">Maintain Your Wellness</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Continue practicing your current healthy habits</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Maintain a good balance between study and relaxation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Stay connected with friends and family</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Keep up with regular physical activity</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Practice mindfulness and stress management techniques</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center text-slate-300">
                <p>Remember, maintaining good mental health is an ongoing process. Keep up these positive habits!</p>
              </div>
            </div>
          )
        };

      case 'low':
        return {
          title: 'Good Progress! 🌟',
          subtitle: 'You\'re making progress! These exercises will help you maintain and improve your mental well-being.',
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Mindfulness Practice</h3>
                  <p className="text-slate-400 mb-4">Enhance your mindfulness with these exercises:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Practice 10-minute guided meditation daily</li>
                    <li>• Try mindful eating during meals</li>
                    <li>• Keep a mindfulness journal</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Stress Reduction</h3>
                  <p className="text-slate-400 mb-4">Manage stress effectively:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Practice progressive muscle relaxation</li>
                    <li>• Create a stress management plan</li>
                    <li>• Learn time management techniques</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Social Well-being</h3>
                  <p className="text-slate-400 mb-4">Strengthen your social connections:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Schedule regular social activities</li>
                    <li>• Practice active listening in conversations</li>
                    <li>• Join a new club or activity group</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Academic Success</h3>
                  <p className="text-slate-400 mb-4">Maintain academic balance:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Create a study-life balance schedule</li>
                    <li>• Set SMART academic goals</li>
                    <li>• Practice effective study techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };

      case 'moderate':
        return {
          title: 'Moderate Mental Health Exercises',
          subtitle: 'You\'re making progress! These exercises will help you maintain and improve your mental well-being.',
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Mindfulness Practice</h3>
                  <p className="text-slate-400 mb-4">Enhance your mindfulness with these exercises:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Practice 10-minute guided meditation daily</li>
                    <li>• Try mindful eating during meals</li>
                    <li>• Keep a mindfulness journal</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Stress Reduction</h3>
                  <p className="text-slate-400 mb-4">Manage stress effectively:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Practice progressive muscle relaxation</li>
                    <li>• Create a stress management plan</li>
                    <li>• Learn time management techniques</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Social Well-being</h3>
                  <p className="text-slate-400 mb-4">Strengthen your social connections:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Schedule regular social activities</li>
                    <li>• Practice active listening in conversations</li>
                    <li>• Join a new club or activity group</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Stress Relieving Games</h3>
                  <p className="text-slate-400 mb-4">Take a break with these games:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• <a href="https://play2048.co/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">2048</a></li>
                    <li>• <a href="https://www.crazygames.com/game/fireboy-and-watergirl-1-forest-temple" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Fireboy and Watergirl</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };

      case 'improvement':
        return {
          title: 'Improvement Exercises',
          subtitle: 'Let\'s work together to improve your mental wellness. These exercises are designed to help you build resilience and coping strategies.',
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Daily Wellness Routine</h3>
                  <p className="text-slate-400 mb-4">Establish a consistent routine:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Start each day with 5 minutes of deep breathing</li>
                    <li>• Write down three things you're grateful for</li>
                    <li>• Take a 10-minute walk outside</li>
                    <li>• Practice positive self-talk</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Emotional Regulation</h3>
                  <p className="text-slate-400 mb-4">Learn to manage your emotions:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Practice the 4-7-8 breathing technique</li>
                    <li>• Use grounding techniques (5-4-3-2-1 method)</li>
                    <li>• Keep an emotion journal</li>
                    <li>• Practice progressive muscle relaxation</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Social Support</h3>
                  <p className="text-slate-400 mb-4">Build your support network:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Reach out to a trusted friend or family member</li>
                    <li>• Join a support group or community</li>
                    <li>• Practice active listening skills</li>
                    <li>• Share your feelings openly</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Professional Support</h3>
                  <p className="text-slate-400 mb-4">Consider seeking professional help:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Talk to a school counselor</li>
                    <li>• Consider therapy or counseling</li>
                    <li>• Reach out to mental health hotlines</li>
                    <li>• Don't hesitate to ask for help</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };

      case 'confidence':
        return {
          title: 'Confidence Building Exercises',
          subtitle: 'Building confidence takes time and practice. These exercises will help you develop a stronger sense of self-worth and resilience.',
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Self-Affirmation Practice</h3>
                  <p className="text-slate-400 mb-4">Build positive self-talk:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Write down your strengths daily</li>
                    <li>• Practice positive affirmations</li>
                    <li>• Challenge negative thoughts</li>
                    <li>• Celebrate small victories</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Goal Setting</h3>
                  <p className="text-slate-400 mb-4">Set achievable goals:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Break large goals into smaller steps</li>
                    <li>• Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
                    <li>• Track your progress regularly</li>
                    <li>• Reward yourself for achievements</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Skill Development</h3>
                  <p className="text-slate-400 mb-4">Build new skills and interests:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Learn something new each week</li>
                    <li>• Practice a hobby you enjoy</li>
                    <li>• Take on new challenges</li>
                    <li>• Join clubs or groups</li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Professional Help</h3>
                  <p className="text-slate-400 mb-4">Don't hesitate to seek support:</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Talk to a mental health professional</li>
                    <li>• Consider cognitive behavioral therapy</li>
                    <li>• Join confidence-building workshops</li>
                    <li>• Remember: asking for help is a sign of strength</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };

      default:
        return {
          title: 'Exercise Recommendations',
          subtitle: 'Based on your assessment, here are some exercises to help improve your mental wellness.',
          content: (
            <div className="text-center text-slate-400">
              <p>No specific exercises found for this assessment result.</p>
            </div>
          )
        };
    }
  };

  const exerciseContent = getExerciseContent();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {exerciseContent.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {exerciseContent.subtitle}
          </p>
        </div>

        <div className="mb-8">
          {exerciseContent.content}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="btn-primary"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/assessment"
            className="btn-secondary"
          >
            Take Another Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exercises;