import api from './api';

export const getProductoras = async () => {
  try {
    const response = await api.get('/productoras');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProductora = async (productora) => {
  try {
    const response = await api.post('/productoras', productora);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductora = async (id, productora) => {
  try {
    const response = await api.put(`/productoras/${id}`, productora);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductora = async (id) => {
  try {
    const response = await api.delete(`/productoras/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
