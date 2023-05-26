import axios from 'axios';
import { ICreateHero, IHero, IHeroResponse } from '../shared/interfaces';

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

export const getHeroById = async (id: number): Promise<IHero> => {
  try {
    const response = await axios.get(`http://localhost:5000/heroes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error retrieving hero by ID');
  }
};

export const createHero = async (heroData: ICreateHero): Promise<IHero> => {
  try {
    const response = await axios.post(`${API_URL}/heroes`, heroData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating hero');
  }
};

export const uploadPhotos = async (heroId: number, photos: File[]): Promise<void> => {
  try {
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append('files', photo);
    });
    await axios.post(`${API_URL}/heroes/${heroId}/upload`, formData);
  } catch (error) {
    throw new Error('Error uploading photos');
  }
};

export const updateHero = async (id: number, heroData: ICreateHero): Promise<IHero> => {
  try {
    const response = await axios.put(`${API_URL}/heroes/${id}`, heroData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating hero');
  }
};

export {};
