# 🧠 MindCare - Mental Health Analysis Platform

A modern mental health support platform that provides AI-powered assessments, chatbot support, progress tracking, and personalized exercise recommendations.

**🌐 Live Demo:** [https://mindcare-psi.vercel.app/](https://mindcare-psi.vercel.app/)

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Live](https://img.shields.io/badge/Live-Vercel-brightgreen)

## ✨ Features

- **🔐 Secure Authentication** - JWT tokens with captcha verification
- **📊 Mental Health Assessment** - 5-question comprehensive evaluation
- **🤖 AI Chatbot** - Google Gemini powered mental health assistant
- **📈 Progress Tracking** - Interactive charts and analytics
- **💪 Exercise Recommendations** - Personalized wellness plans with download option
- **📱 Responsive Design** - Works perfectly on all devices
- **🎨 Modern UI** - Dark theme with smooth animations

## 🛠 Tech Stack

**Frontend:** React, TailwindCSS, Vite, Axios  
**Backend:** Node.js, Express, MongoDB, JWT  
**AI:** Google Gemini API  
**Deployment:** Vercel (Frontend) + Render (Backend)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Google Gemini API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mental-health-analysis.git
cd mental-health-analysis
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mental-health
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=https://mindcare-psi.vercel.app
NODE_ENV=production
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
VITE_REACT_APP_API_URL=https://mentalhealth-zpq9.onrender.com
```

4. **Run Locally**
```bash
# Backend
cd backend && npm run dev

# Frontend  
cd frontend && npm run dev
```

## 🌐 Deployment

### Frontend (Vercel)
- **Live URL:** [https://mindcare-psi.vercel.app/](https://mindcare-psi.vercel.app/)
- Connected to GitHub repository
- Automatic deployment on push to main branch
- Environment variable: `VITE_REACT_APP_API_URL=https://mentalhealth-zpq9.onrender.com`

### Backend (Render)
- **API URL:** https://mentalhealth-zpq9.onrender.com
- Connected to GitHub repository
- Automatic deployment on push to main branch
- Environment variables configured for production

### Database (MongoDB Atlas)
- Cloud-hosted MongoDB database
- Secure connection with authentication
- Production-ready with proper indexing

## 📚 Key Features

### Mental Health Assessment
- 5 questions covering stress, sleep, mood, social interaction, and academic pressure
- Real-time scoring (1-5 scale)
- Personalized exercise recommendations based on results

### AI Chatbot
- Google Gemini AI integration
- Empathetic mental health support
- Conversation suggestions
- Text-to-speech functionality

### Progress Tracking
- Interactive SVG charts (no Python dependencies)
- Trend analysis (improving/declining/stable)
- Assessment history and statistics

### Exercise Recommendations
- Personalized plans based on assessment scores
- Downloadable text files with complete recommendations
- Multiple categories: congratulations, low, moderate, improvement, confidence

## 🔒 Security Features

- JWT authentication with secure cookies
- Password hashing with bcrypt
- CORS configuration for production
- Captcha verification
- Protected routes
- Input validation

## 🎯 Try It Out

Visit [https://mindcare-psi.vercel.app/](https://mindcare-psi.vercel.app/) to:

1. **Register** for a new account
2. **Take the assessment** to get personalized recommendations
3. **Chat with the AI** for mental health support
4. **Track your progress** with interactive charts
5. **Download exercise plans** for offline reference

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

- 📧 Email: support@mindcare.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/mental-health-analysis/issues)

### Crisis Support
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

## 🙏 Acknowledgments

- Google Gemini AI for chatbot capabilities
- TailwindCSS for styling
- React community for documentation
- Mental health professionals for guidance

---

<div align="center">

**Made with ❤️ for Mental Health Awareness**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-green?style=for-the-badge)](https://mindcare-psi.vercel.app/)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/mental-health-analysis?style=social)](https://github.com/yourusername/mental-health-analysis)

</div>