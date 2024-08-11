import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { API_BASE_URL} from '../env';
import { useLocation, useNavigate } from 'react-router-dom';

const AUTH_URL = `${API_BASE_URL}/auth`;
const CARD_URL = `${API_BASE_URL}/cards`;

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  getCardById: (id: number) => Promise<PokemonCard | null>;
  getAllCards: (
    type: string,
    name: string,
    page: number,
    limit: number
  ) => Promise<PokemonCardsResponse>;
  initiateBattle: (cardId: number, opponentId: number) => Promise<string>;
  isAuthenticated: boolean;
  error: string | null;
}

export interface PokemonCardsResponse {
  data: PokemonCard[];
  total: number;
}

export interface PokemonCard {
  id: number;
  name: string;
  type: string;
  hp: number;
  abilities: string[];
  weaknesses: string[];
  resistances: string[];
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
      setError(null);
    } catch (err) {
      console.error(err)
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
      console.error(err)
      setError('Registration failed. Please try again.');
    }
  };

  const getAllCards = async (
    type?: string,
    name?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PokemonCardsResponse> => {
    try {
      const response = await axios.get<PokemonCardsResponse>(CARD_URL, {
        params: { type, name, page, limit },
        headers: {"Authorization" : `Bearer ${token}`}
      });
      setError(null);
      return response.data;
    } catch (err) {
      console.error(err)
      setError('Cards failed.');
      return {data: [], total: 0};
    }
  };

  const getCardById = async (cardId: number): Promise<PokemonCard | null> => {
    try {
      const response = await axios.get(`${CARD_URL}/${cardId}`, {
        headers: {"Authorization" : `Bearer ${token}`}
      });
      setError(null);
      return response.data;
    } catch (err) {
      console.error(err)
      setError(`Card ${cardId} not exist.`);
      return null;
    }
  };
  
  const initiateBattle = async (cardId: number, opponentId: number): Promise<string> => {
    try {
      const response = await axios.get(`${CARD_URL}/${cardId}/battle/${opponentId}`);
      setError(null);
      return response.data;
    } catch (err) {
      console.error(err)
      setError(`Card ${cardId} or oponent ${opponentId} not exist.`);
      return '';
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
        token,
        login,
        logout,
        register,
        getCardById,
        getAllCards,
        initiateBattle,
        isAuthenticated,
        error
      }}>
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
