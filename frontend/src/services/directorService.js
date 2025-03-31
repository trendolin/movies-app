// frontend/src/services/directorService.js
import api from './api'; // axios con baseURL

export const getDirectores = async () => {
  const response = await api.get('/directores');
  return response.data;
};

export const createDirector = async (director) => {
  const response = await api.post('/directores', director);
  return response.data;
};

export const updateDirector = async (id, director) => {
  const response = await api.put(`/directores/${id}`, director);
  return response.data;
};

export const deleteDirector = async (id) => {
  const response = await api.delete(`/directores/${id}`);
  return response.data;
};

