import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Pagination, ThemeProvider, Container, Box, CssBaseline, createTheme, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { PokemonCard, useAuth } from '../context/AuthContext';

const defaultTheme = createTheme();

const CardList: React.FC = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [type, setType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const { getAllCards } = useAuth();
  const limit = 10;

  useEffect(() => {
    const fetchCards = async () => {
      const { data, total } = await getAllCards(type, name, page, limit);
      setCards(data);
      setTotal(total);
    };
    fetchCards();
  }, [type, name, page]);

  return (
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
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <Link to={`/cards/${card.id}`} style={{ textDecoration: 'none' }}>
                  <Card>
                    <CardMedia
                      sx={{ height: 120, textDecorationLine: 'none'}}
                      image={card.src}
                      title={card.name}
                    />
                    <CardContent>
                      <Typography color="primary" variant="h5">
                        {card.name}
                      </Typography>
                      <Typography>Type: {card.type}</Typography>
                      <Typography>HP: {card.hp}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={(e, value) => setPage(value)}
            style={{ marginTop: '20px' }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CardList;
