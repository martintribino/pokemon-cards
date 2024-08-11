import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardList from './components/CardList';
import CardDetail from './components/CardDetails';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Public/Login';
import Register from './components/Public/Register';
import Dashboard from './components/Dashboard';
import TopBar from './components/Public/TopBar';
import { createTheme, ThemeProvider } from '@mui/material';
import getTheme from './getTheme';
import ErrorBoundary from './components/Public/ErrorBoundary';

const defaultTheme = createTheme(getTheme('light'));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <ErrorBoundary>
          <AuthProvider>
            <TopBar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cards" element={<CardList />} />
                  <Route path="/cards/:id" element={<CardDetail />} />
                </Route>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </AuthProvider>
          </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
};

export default App;

