// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  // Ensure this URL matches your deployed backend URL on Vercel/Render
  baseURL: 'https://portfolio-cgpo.vercel.app/api/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;