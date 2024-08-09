import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllCards, PokemonCard } from '../services/cardService';

const CardList: React.FC = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [type, setType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const limit = 10;

  const fetchCards = async () => {
    try {
      const { data, total } = await getAllCards(type, name, page, limit);
      setCards(data);
      setTotal(total);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [type, name, page]);

  const handleSearch = () => {
    setPage(1);
    fetchCards();
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  <Link to={`/cards/${card.id}`}>{card.name}</Link>
                </Typography>
                <Typography>Type: {card.type}</Typography>
                <Typography>HP: {card.hp}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={(e, value) => setPage(value)}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default CardList;
