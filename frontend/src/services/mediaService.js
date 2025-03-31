import api from './api';

export const getMedia = async () => {
  try {
    const response = await api.get('/media');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMediaById = async (id) => {
  try {
    const response = await api.get(`/media/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMedia = async (media) => {
  try {
    const response = await api.post('/media', media);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMedia = async (id, media) => {
  try {
    const response = await api.put(`/media/${id}`, media);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMedia = async (id) => {
  try {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
