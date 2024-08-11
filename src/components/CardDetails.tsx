import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
  Card,
  CardContent,
  Typography,
  Button,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  createTheme,
  CardMedia,
  CardActions,
  Select,
  MenuItem
} from '@mui/material';
import { BattleCardsResponse, PokemonCard, useAuth } from '../context/AuthContext';
import SendIcon from '@mui/icons-material/Send';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<PokemonCard | null>(null);
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [oponent, setOponent] = useState<string | null>(null);
  const [battle, setBattle] = useState<BattleCardsResponse | null>(null);
  const { getCardById, initiateBattle, getAllCards } = useAuth();

  const defaultTheme = createTheme();

  useEffect(() => {
    const fetchCard = async () => {
      const data = await getCardById(Number(id));
      setCard(data);
    };

    fetchCard();
  }, [id]);
  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await getAllCards('', '', 1, 10);
      const oponents = data.filter((c) => (c.id !== Number(id)));
      setCards(oponents);
      setTotal(oponents.length);
      if (oponents[0]) {
        setOponent(oponents[0].id.toString())
      }
    };
    fetchCards();
  }, []);

  const handleBattle = async (opponentId: string) => {
    const result = await initiateBattle(Number(id), Number(opponentId));
    setBattle(result);
  };

  return (
    card ? (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md"
            sx={{
              marginTop: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
          <CssBaseline />
          <Card
              sx={{ width: 350 }}
          >
            <CardMedia
              sx={{ height: 180 }}
              image={card.src}
              title={card.name}
            />
            <CardContent>
              <Typography color="primary" variant="h3">{card.name}</Typography>
                    {
                      battle && (battle.defeat ?
                        (<Alert severity="success">{battle.message}</Alert>) :
                        (<Alert severity="error">{battle.message}</Alert>))
                    }
              <Typography>Type: {card.type}</Typography>
              <Typography>HP: {card.hp}</Typography>
              <Typography color="primary" variant="h6">Abilities: {card.abilities.join(', ')}</Typography>
              <Typography color="error" variant="h6">Weaknesses: {card.weaknesses.join(', ')}</Typography>
              <Typography color="primary" variant="h6">Resistances: {card.resistances.join(', ')}</Typography>
            </CardContent>
            {
              total > 0 && (
                <CardActions
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}
                >
                  <Select
                    sx={{ height: 40 }}
                    id="oponent-select"
                    value={oponent}
                    onChange={(e) => setOponent(e.target.value)}
                  >
                    {
                      cards.map((c) => (
                        <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
                      ))
                    }
                  </Select>
                  {
                    oponent && (
                      <Button
                        sx={{ height: 40 }}
                        variant="outlined"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={() => handleBattle(oponent)}
                        style={{ marginLeft: '10px' }}
                      >
                        Battle
                      </Button>
                    )
                  }
                </CardActions>
              )
            }
          </Card>
        </Container>
      </ThemeProvider>
    ) : (
      <Typography>Loading...</Typography>
    )
  );
};

export default CardDetail;

