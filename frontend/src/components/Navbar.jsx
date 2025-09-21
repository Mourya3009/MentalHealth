import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useToast } from '../contexts/ToastContext.jsx';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">MindCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive('/dashboard') 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/assessment"
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive('/assessment') 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Assessment
                </Link>
                <Link
                  to="/chatbot"
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive('/chatbot') 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  AI Chat
                </Link>
                <Link
                  to="/progress"
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive('/progress') 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Progress
                </Link>
                <Link
                  to="/support"
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive('/support') 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Support
                </Link>
                
                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <span className="text-slate-300">Welcome, {user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4">
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive('/dashboard') 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/assessment"
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive('/assessment') 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Assessment
                  </Link>
                  <Link
                    to="/chatbot"
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive('/chatbot') 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    AI Chat
                  </Link>
                  <Link
                    to="/progress"
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive('/progress') 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Progress
                  </Link>
                  <Link
                    to="/support"
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive('/support') 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Support
                  </Link>
                  <div className="pt-4 border-t border-slate-700">
                    <div className="px-3 py-2 text-slate-300">
                      Welcome, {user?.username}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary mx-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;