import axios from 'axios';

const API = axios.create({
  // Use environment variable or fallback to localhost for development
  baseURL: 'https://portfolio-cgpo.vercel.app/api/v1', 
  withCredentials: true,
});

// REQUEST INTERCEPTOR: Attaches the token to every outgoing message
API.interceptors.request.use((config) => {
  // CHANGED: Now looks in localStorage (where we saved it) instead of sessionStorage
  const token = localStorage.getItem('token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;