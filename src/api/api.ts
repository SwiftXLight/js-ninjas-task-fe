import axios from 'axios';
import { IHeroResponse } from '../shared/interfaces';

const API_URL = 'http://localhost:5000';

export const fetchHeroes = async (page: number, limit: number): Promise<{ data: IHeroResponse[]; totalHeroes: number }> => {
  try {
    const response = await axios.get(`${API_URL}/heroes`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const deleteHero = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/heroes/${id}`);
  } catch (error) {
    throw new Error(`Error deleting hero with ID: ${id}`);
  }
};

export {};
