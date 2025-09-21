import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useToast } from '../contexts/ToastContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, getCaptcha } = useAuth();
  const { error, success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    const newCaptcha = await getCaptcha();
    if (newCaptcha) {
      setCaptcha(newCaptcha);
    }
  };

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
      const result = await login(formData.email, formData.password, formData.captcha);
      
      if (result.success) {
        success(result.message);
        navigate(from, { replace: true });
      } else {
        error(result.message);
        loadCaptcha(); // Load new captcha on error
        setFormData({ ...formData, captcha: '' });
      }
    } catch (err) {
      error('An unexpected error occurred');
      loadCaptcha();
      setFormData({ ...formData, captcha: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome
              <span className="block gradient-text">Back</span>
            </h2>
            <p className="text-slate-400">Sign in to continue your mental health journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-slate-300 mb-2">
                Captcha Verification
              </label>
              <div className="flex space-x-3">
                <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-center">
                  <span className="text-lg font-bold text-white tracking-wider select-none">
                    {captcha}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={loadCaptcha}
                  className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white hover:bg-slate-700/50 transition-colors duration-200"
                  title="Refresh Captcha"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div> */}
              {/* <input
                type="text"
                id="captcha"
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                className="input-field mt-3"
                placeholder="Enter the captcha above"
                required
              />
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="loading-spinner w-4 h-4"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
              >
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;