// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  // We hardcode the URL to ensure it connects to your live Vercel Backend
  // We also added '/v1' because that is what your server expects
  baseURL: 'https://portfolio-cgpo.vercel.app/api/v1',
  withCredentials: true,
});

// Request interceptor to add the Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;