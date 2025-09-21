import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000';

// Configure apiClient defaults
apiClient.defaults.baseURL = API_URL;
apiClient.defaults.withCredentials = true;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configure axios defaults
  apiClient.defaults.withCredentials = true;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.get('/api/auth/me');
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Not authenticated');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, captcha) => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password,
        captcha
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post('/api/auth/register', userData);
      
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const getCaptcha = async () => {
    try {
      const response = await apiClient.get('/api/auth/captcha');
      return response.data.captcha;
    } catch (error) {
      console.error('Captcha error:', error);
      return null;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    getCaptcha,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};