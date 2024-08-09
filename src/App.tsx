import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import CardList from './components/CardList';
import CardDetail from './components/CardDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Pokémon Card Battle
        </Typography>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="/cards" element={<CardList />} />
            <Route path="/cards/:id" element={<CardDetail />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Router>
  );
};

export default App;

