# Mental Health Analysis Platform - MERN Stack

A comprehensive mental health support platform built with React, Node.js, Express, and MongoDB. This application provides AI-powered mental health assessments, chatbot support, progress tracking, and personalized exercise recommendations.

## Features

- **User Authentication**: Secure login/register with JWT tokens and captcha verification
- **Mental Health Assessment**: 5-question comprehensive assessment with personalized recommendations
- **AI Chatbot**: Google Gemini AI-powered mental health assistant
- **Progress Tracking**: Visual analytics and trend tracking with Python-generated plots
- **Exercise Recommendations**: Personalized exercises based on assessment results
- **Support Resources**: Videos, blogs, movies, and crisis support information
- **Self-Analysis**: Guided reflection questions for personal growth
- **Responsive Design**: Modern UI with TailwindCSS and smooth animations

## Tech Stack

### Frontend
- React 18
- TailwindCSS
- React Router DOM
- Axios
- React Speech Kit

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Google Gemini AI
- Python (for data visualization)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Python 3.x
- Google Gemini API Key

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd mental-health-analysis
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/Mental-Health
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Python Dependencies
```bash
pip install matplotlib numpy
```

## Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system.

### 2. Start the Backend
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

### 3. Start the Frontend
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/captcha` - Get captcha for login
- `GET /api/auth/me` - Get current user

### Assessment
- `POST /api/assessment/submit` - Submit mental health assessment
- `GET /api/assessment/latest` - Get latest assessment
- `GET /api/assessment/stats` - Get assessment statistics

### Chatbot
- `POST /api/chatbot/chat` - Chat with AI assistant
- `GET /api/chatbot/suggestions` - Get conversation suggestions

### Progress
- `GET /api/plot/generate` - Generate progress plots
- `GET /api/plot/data` - Get plot data

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/assessments` - Get user assessment history

## Project Structure

```
Mental-Health-Analysis-main/
├── backend/                    # Node.js/Express API Server
│   ├── models/
│   │   └── User.js            # MongoDB User model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── user.js            # User management routes
│   │   ├── assessment.js      # Mental health assessment routes
│   │   ├── chatbot.js         # AI chatbot routes
│   │   └── plot.js            # Progress tracking routes
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── scripts/
│   │   └── plot.py            # Python script for data visualization
│   ├── public/
│   │   └── static/            # Generated plot images
│   ├── config.env             # Environment variables
│   ├── server.js              # Express server entry point
│   └── package.json           # Backend dependencies
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js      # Navigation component
│   │   │   ├── ProtectedRoute.js # Route protection
│   │   │   └── ToastContainer.js # Toast notifications
│   │   ├── contexts/
│   │   │   ├── AuthContext.js # Authentication context
│   │   │   └── ToastContext.js # Toast context
│   │   ├── pages/
│   │   │   ├── Home.js        # Landing page
│   │   │   ├── Login.js       # Login page
│   │   │   ├── Register.js    # Registration page
│   │   │   ├── Dashboard.js   # User dashboard
│   │   │   ├── Assessment.js  # Mental health assessment
│   │   │   ├── Chatbot.js     # AI chatbot interface
│   │   │   ├── Exercises.js   # Exercise recommendations
│   │   │   ├── Progress.js    # Progress tracking
│   │   │   ├── Support.js     # Support resources
│   │   │   └── SelfAnalysis.js # Self-analysis form
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles with Tailwind
│   ├── tailwind.config.js     # TailwindCSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── package.json           # Frontend dependencies
└── README.md                  # Project documentation
```

## Key Features Explained

### Mental Health Assessment
- 5-question assessment covering stress, sleep, mood, social interaction, and academic pressure
- Scores range from 1-5 for each question
- Average score determines exercise recommendations
- Results stored in MongoDB for progress tracking

### AI Chatbot
- Powered by Google Gemini AI
- Provides empathetic mental health support
- Includes conversation suggestions
- Text-to-speech functionality

### Progress Tracking
- Python-generated line and bar charts
- Trend analysis (improving, declining, stable)
- Assessment history and statistics
- Visual progress representation

### Exercise Recommendations
- Personalized based on assessment scores
- Different exercise types: congratulations, low, moderate, improvement, confidence
- Comprehensive wellness strategies
- Links to external resources

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Captcha verification for login
- Protected routes
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@mindcare.com or create an issue in the repository.

## Acknowledgments

- Google Gemini AI for chatbot functionality
- TailwindCSS for styling
- React community for excellent documentation
- Mental health professionals for guidance on assessment questions
