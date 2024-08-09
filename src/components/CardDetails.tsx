import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { getCardById, initiateBattle, PokemonCard } from '../services/cardService';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<PokemonCard | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getCardById(Number(id));
        setCard(data);
      } catch (error) {
        console.error('Error fetching card:', error);
      }
    };

    fetchCard();
  }, [id]);

  const handleBattle = async (opponentId: number) => {
    try {
      const result = await initiateBattle(Number(id), opponentId);
      alert(result);
    } catch (error) {
      console.error('Error initiating battle:', error);
    }
  };

  return (
    card ? (
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
    ) : (
      <Typography>Loading...</Typography>
    )
  );
};

export default CardDetail;
