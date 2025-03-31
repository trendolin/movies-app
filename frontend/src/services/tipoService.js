// services/tipoService.js
import api from './api';

export const getTipos = async () => {
  try {
    const response = await api.get('/tipos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTipo = async (tipo) => {
  try {
    const response = await api.post('/tipos', tipo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTipo = async (id, tipo) => {
  try {
    const response = await api.put(`/tipos/${id}`, tipo);
    return response.data;
  } catch (error) {
    console.error('Error en updateTipo:', error);
    throw error;
  }
};

export const deleteTipo = async (id) => {
  try {
    const response = await api.delete(`/tipos/${id}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};