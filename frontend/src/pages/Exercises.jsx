import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

const Exercises = () => {
  const { type } = useParams();
  const location = useLocation();
  const { assessmentData, recommendationDetails } = location.state || {};

  // Helper function to map form values to readable strings for the report
  const mapValueToLabel = (field, value) => {
    const mappings = {
      stressLevel: {
        '5': 'Very Low', '4': 'Low', '3': 'Moderate', '2': 'High', '1': 'Very High'
      },
      sleepQuality: {
        '1': 'Very Poor', '2': 'Poor', '3': 'Average', '4': 'Good', '5': 'Excellent'
      },
      mood: {
        '1': 'Very Negative', '2': 'Negative', '3': 'Neutral', '4': 'Positive', '5': 'Very Positive'
      },
      socialInteraction: {
        '1': 'Very Uncomfortable', '2': 'Uncomfortable', '3': 'Neutral', '4': 'Comfortable', '5': 'Very Comfortable'
      },
      academicPressure: {
        '1': 'Overwhelming', '2': 'Heavy', '3': 'Manageable', '4': 'Light', '5': 'Very Light'
      }
    };
    return mappings[field] ? mappings[field][value] : value;
  };

  // Function to generate the exercise content as a plain HTML string
  // This is specifically for the downloadable report
  const generateExercisesHtml = (exerciseType) => {
    let html = '';
    const items = []; // Collect list items here

    switch (exerciseType) {
      case 'congratulations':
        items.push(
          'Continue practicing your current healthy habits',
          'Maintain a good balance between study and relaxation',
          'Stay connected with friends and family',
          'Keep up with regular physical activity',
          'Practice mindfulness and stress management techniques'
        );
        html += `<h3>Maintain Your Wellness</h3><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        html += `<p>Remember, maintaining good mental health is an ongoing process. Keep up these positive habits!</p>`;
        break;

      case 'low':
        items.push(
          'Mindfulness Practice: Practice 10-minute guided meditation daily, Try mindful eating during meals, Keep a mindfulness journal',
          'Stress Reduction: Practice progressive muscle relaxation, Create a stress management plan, Learn time management techniques',
          'Social Well-being: Schedule regular social activities, Practice active listening in conversations, Join a new club or activity group',
          'Academic Success: Create a study-life balance schedule, Set SMART academic goals, Practice effective study techniques'
        );
        html += `<p>Here are some recommended exercises to maintain and improve your well-being:</p><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        break;

      case 'moderate':
        items.push(
          'Mindfulness Practice: Practice 10-minute guided meditation daily, Try mindful eating during meals, Keep a mindfulness journal',
          'Stress Reduction: Practice progressive muscle relaxation, Create a stress management plan, Learn time management techniques',
          'Social Well-being: Schedule regular social activities, Practice active listening in conversations, Join a new club or activity group',
          `Stress Relieving Games: Play <a href="https://play2048.co/" target="_blank" rel="noopener noreferrer">2048</a>, <a href="https://www.crazygames.com/game/fireboy-and-watergirl-1-forest-temple" target="_blank" rel="noopener noreferrer">Fireboy and Watergirl</a>`
        );
        html += `<p>Here are some recommended exercises to help you:</p><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        break;

      case 'improvement':
        items.push(
          'Daily Wellness Routine: Start each day with 5 minutes of deep breathing, Write down three things you\'re grateful for, Take a 10-minute walk outside, Practice positive self-talk',
          'Emotional Regulation: Practice the 4-7-8 breathing technique, Use grounding techniques (5-4-3-2-1 method), Keep an emotion journal, Practice progressive muscle relaxation',
          'Social Support: Reach out to a trusted friend or family member, Join a support group or community, Practice active listening skills, Share your feelings openly',
          'Professional Support: Talk to a school counselor, Consider therapy or counseling, Reach out to mental health hotlines, Don\'t hesitate to ask for help'
        );
        html += `<p>These exercises are designed to help you build resilience and coping strategies:</p><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        break;

      case 'confidence':
        items.push(
          'Self-Affirmation Practice: Write down your strengths daily, Practice positive affirmations, Challenge negative thoughts, Celebrate small victories',
          'Goal Setting: Break large goals into smaller steps, Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound), Track your progress regularly, Reward yourself for achievements',
          'Skill Development: Learn something new each week, Practice a hobby you enjoy, Take on new challenges, Join clubs or groups',
          'Professional Help: Talk to a mental health professional, Consider cognitive behavioral therapy, Join confidence-building workshops, Remember: asking for help is a sign of strength'
        );
        html += `<p>These exercises will help you develop a stronger sense of self-worth and resilience:</p><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        break;

      default:
        html += `<p>No specific exercises found for this assessment result.</p>`;
        break;
    }
    return html;
  };

  const getExerciseContent = () => {
    // Keep this for displaying on the page, it uses JSX
    // This function will primarily serve the render part of the component
    // The downloadable report will use `generateExercisesHtml` for its content string
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

  const handleDownloadReport = () => {
    // Generate the HTML content for the report
    let reportHtml = `
      <html>
      <head>
        <title>Mental Health Assessment Report</title>
        <style>
          body { font-family: sans-serif; margin: 20px; line-height: 1.6; color: #333; }
          h1, h2, h3 { color: #555; margin-bottom: 10px; }
          .container { max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .section { margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-left: 5px solid #a78bfa; }
          .section-green { border-left: 5px solid #22c55e; background-color: #f0fdf4; }
          .section h3 { color: #a78bfa; }
          .section-green h3 { color: #22c55e; }
          ul { list-style-type: disc; margin-left: 20px; }
          li { margin-bottom: 5px; }
          .bold { font-weight: bold; }
          .center { text-align: center; }
          .italic { font-style: italic; }
          .message { margin-top: 15px; padding: 10px; border-radius: 5px; background-color: #e6f7ff; border: 1px solid #91d5ff; color: #1890ff;}
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="center" style="color: #6a0dad;">Mental Health Assessment Report</h1>
          <p class="center italic" style="color: #666;">Generated on: ${new Date().toLocaleDateString()}</p>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
    `;

    // Add Assessment Details if available
    if (assessmentData) {
      reportHtml += `
        <div class="section">
          <h2>Your Assessment Responses</h2>
          <ul>
            <li><span class="bold">Stress Level:</span> ${mapValueToLabel('stressLevel', assessmentData.stressLevel)}</li>
            <li><span class="bold">Sleep Quality:</span> ${mapValueToLabel('sleepQuality', assessmentData.sleepQuality)}</li>
            <li><span class="bold">Mood:</span> ${mapValueToLabel('mood', assessmentData.mood)}</li>
            <li><span class="bold">Social Interaction:</span> ${mapValueToLabel('socialInteraction', assessmentData.socialInteraction)}</li>
            <li><span class="bold">Academic Pressure:</span> ${mapValueToLabel('academicPressure', assessmentData.academicPressure)}</li>
          </ul>
        </div>
      `;
    }

    // Add Recommendation Summary if available
    if (recommendationDetails) {
        reportHtml += `
            <div class="section section-green">
                <h2>Your Recommendation Summary</h2>
                <ul>
                    <li><span class="bold">Overall Recommendation:</span> ${recommendationDetails.recommendation.replace(/_/g, ' ').toUpperCase()}</li>
                    <li><span class="bold">Average Score:</span> ${recommendationDetails.averageScore.toFixed(2)} / 5</li>
                    <li><span class="bold">Exercise Category:</span> ${exerciseContent.title}</li>
                </ul>
                <p class="message">${exerciseContent.subtitle}</p>
            </div>
        `;
    }

    // Add Exercises/Content using the new `generateExercisesHtml`
    reportHtml += `
        <div class="section">
            <h2>Recommended Exercises and Strategies</h2>
            <div class="content-detail">
                ${generateExercisesHtml(type)}
            </div>
        </div>
        </div>
      </body>
      </html>
    `;

    // Create a Blob from the HTML string
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `MindCare_Assessment_Report_${new Date().toISOString().slice(0, 10)}.html`; // yyyy-mm-dd
    document.body.appendChild(a); // Append to body to make it clickable
    a.click(); // Programmatically click the link
    document.body.removeChild(a); // Remove the link after download
    URL.revokeObjectURL(url); // Clean up the URL object
  };

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
          {/* Display general recommendation if available */}
          {recommendationDetails?.recommendation && (
            <p className="text-md text-slate-400 mt-4">
                Your average assessment score: <span className="font-semibold text-white">{(recommendationDetails.averageScore || 0).toFixed(2)} / 5</span>
            </p>
          )}
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
          <button
            onClick={handleDownloadReport}
            className="btn-secondary flex items-center justify-center" // Added flex for icon and text alignment
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Report
          </button>
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