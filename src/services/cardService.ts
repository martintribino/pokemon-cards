import axios from 'axios';
import { API_BASE_URL } from '../env';

export interface PokemonCard {
  id: number;
  name: string;
  type: string;
  hp: number;
  abilities: string[];
  weaknesses: string[];
  resistances: string[];
}

const CARD_URL = `${API_BASE_URL}/cards`;

export const getAllCards = async (
  type?: string,
  name?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ data: PokemonCard[], total: number }> => {
  const response = await axios.get(CARD_URL, {
    params: { type, name, page, limit },
  });
  return response.data;
};

export const getCardById = async (id: number): Promise<PokemonCard> => {
  const response = await axios.get(`${CARD_URL}/${id}`);
  return response.data;
};

export const initiateBattle = async (
  cardId: number,
  opponentId: number
): Promise<string> => {
  const response = await axios.get(`${CARD_URL}/${cardId}/battle/${opponentId}`);
  return response.data;
};
