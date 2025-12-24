import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app starts
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // CHANGED: Check localStorage
      const token = localStorage.getItem('token'); 
      
      if (token) {
        try {
          // Verify the token is valid with the backend
          const { data } = await API.get('/auth/me');
          setUser(data.data);
        } catch (error) {
          console.error("Session expired or invalid:", error);
          localStorage.removeItem('token'); // Clear bad token
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token); // Save to LocalStorage
    setUser({ token }); // Optimistically set user
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear from LocalStorage
    setUser(null);
    window.location.href = '/admin/login'; // Force redirect
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};