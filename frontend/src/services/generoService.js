import api from './api';

export const getGeneros = async () => {
  try {
    const response = await api.get('/generos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGenero = async (genero) => {
  try {
    const response = await api.post('/generos', genero);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGenero = async (id, genero) => {
  try {
    const response = await api.put(`/generos/${id}`, genero);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGenero = async (id) => {
  try {
    const response = await api.delete(`/generos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
