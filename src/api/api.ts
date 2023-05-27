import axios from 'axios';
import { ICreateHero, IHero, IHeroResponse } from '../shared/interfaces';

const API_URL = 'http://localhost:5000';

export const fetchHeroes = async (page: number, limit: number, nickname?: string): Promise<{ data: IHeroResponse[]; totalHeroes: number }> => {
  try {
    const response = await axios.get(`${API_URL}/heroes`, {
      params: {
        page,
        limit,
        nickname,
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
    const response = await axios.get(`${API_URL}/heroes/${id}`);
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

export const deleteImage = async (id: number, filename: string): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/heroes/${id}/images/${filename}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const uploadPhotosAppend = async (id: number, files: File[]): Promise<IHero> => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const response = await axios.post(`${API_URL}/heroes/${id}/upload/append`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

export {};
