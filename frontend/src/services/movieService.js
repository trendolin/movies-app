import api from './api';

export const getMovies = async () => {
  try {
    const response = await api.get('/peliculas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMovie = async (movie) => {
  try {
    const response = await api.post('/peliculas', movie);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async (id, movie) => {
  try {
    const response = await api.put(`/peliculas/${id}`, movie);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await api.delete(`/peliculas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
