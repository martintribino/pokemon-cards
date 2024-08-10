import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { API_BASE_URL } from '../env';
import { useLocation, useNavigate } from 'react-router-dom';

const AUTH_URL = `${API_BASE_URL}/auth`;

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, [location]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${AUTH_URL}/login`, { email, password });
      setToken(response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard')
      setError(null); // Clear any previous error
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login')
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await axios.post(`${AUTH_URL}/register`, { email, password, name });
      setError(null);
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, register, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
