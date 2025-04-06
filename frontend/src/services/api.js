import axios from 'axios';

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL, 
  baseURL: 'https://movies-app-1-wst8.onrender.com/api'
});

export default api;
