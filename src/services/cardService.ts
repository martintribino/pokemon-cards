import axios from 'axios';

export interface PokemonCard {
  id: number;
  name: string;
  type: string;
  hp: number;
  abilities: string[];
  weaknesses: string[];
  resistances: string[];
}

const API_BASE_URL = 'http://localhost:3000/cards';

export const getAllCards = async (
  type?: string,
  name?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ data: PokemonCard[], total: number }> => {
  const response = await axios.get(API_BASE_URL, {
    params: { type, name, page, limit },
  });
  return response.data;
};

export const getCardById = async (id: number): Promise<PokemonCard> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const initiateBattle = async (
  cardId: number,
  opponentId: number
): Promise<string> => {
  const response = await axios.get(`${API_BASE_URL}/${cardId}/battle/${opponentId}`);
  return response.data;
};
