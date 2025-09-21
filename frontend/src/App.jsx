import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Chatbot from './pages/Chatbot';
import Exercises from './pages/Exercises';
import Progress from './pages/Progress';
import Support from './pages/Support';
import SelfAnalysis from './pages/SelfAnalysis';
import LLMchatbot from './pages/MentalHealthAssistant';

// Toast notifications
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <main className="relative">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/assessment" element={
                  <ProtectedRoute>
                    <Assessment />
                  </ProtectedRoute>
                } />
                <Route path="/chatbot" element={
                  <ProtectedRoute>
                    <Chatbot />
                  </ProtectedRoute>
                } />
                <Route path="/exercises/:type" element={
                  <ProtectedRoute>
                    <Exercises />
                  </ProtectedRoute>
                } />
                <Route path="/progress" element={
                  <ProtectedRoute>
                    <Progress />
                  </ProtectedRoute>
                } />
                <Route path="/support" element={
                  <ProtectedRoute>
                    <Support />
                  </ProtectedRoute>
                } />
                <Route path="/llmchatbot" element={
                  <ProtectedRoute>
                    <LLMchatbot />
                  </ProtectedRoute>
                } />
                <Route path="/self-analysis" element={
                  <ProtectedRoute>
                    <SelfAnalysis />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;