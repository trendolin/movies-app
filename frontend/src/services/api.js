import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Asegúrate de tener REACT_APP_API_URL en tu .env, por ejemplo: http://localhost:5000/api
});

export default api;
