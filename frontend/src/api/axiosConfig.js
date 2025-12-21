// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portfolio-cgpo.vercel.app/api/v1',
  withCredentials: true,
});

// Request interceptor to add the Token to every request
api.interceptors.request.use((config) => {
  // SECURITY UPDATE: Change localStorage to sessionStorage
  // This ensures the token is found only while the tab is open.
  const token = sessionStorage.getItem('token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;