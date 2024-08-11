import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, ThemeProvider, Container, CssBaseline, Box, createTheme } from '@mui/material';
import { PokemonCard, useAuth } from '../context/AuthContext';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<PokemonCard | null>(null);
  const [battle, setBattle] = useState<string>('');
  const navigate = useNavigate();
  const { getCardById, initiateBattle } = useAuth();

  const defaultTheme = createTheme();

  useEffect(() => {
    const fetchCard = async () => {
      const data = await getCardById(Number(id));
      setCard(data);
    };

    fetchCard();
  }, [id]);

  const handleBattle = async (opponentId: number) => {
    const result = await initiateBattle(Number(id), opponentId);
    setBattle(result);
  };

  return (
    card ? (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h4">{card.name}</Typography>
                <Typography>Type: {card.type}</Typography>
                <Typography>HP: {card.hp}</Typography>
                <Typography>Abilities: {card.abilities.join(', ')}</Typography>
                <Typography>Weaknesses: {card.weaknesses.join(', ')}</Typography>
                <Typography>Resistances: {card.resistances.join(', ')}</Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/cards')}
                  style={{ marginTop: '20px' }}
                >
                  Back to All Cards
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleBattle(2)} // Replace '2' with dynamic opponent ID
                  style={{ marginTop: '20px', marginLeft: '10px' }}
                >
                  Battle!
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    ) : (
      <Typography>Loading...</Typography>
    )
  );
};

export default CardDetail;
