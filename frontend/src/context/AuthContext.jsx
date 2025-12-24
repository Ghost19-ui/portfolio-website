import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axiosConfig';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // 1. Check LocalStorage for the key
      const token = localStorage.getItem('token'); 
      
      if (token) {
        // OPTIMISTIC UPDATE:
        // Assume valid if token exists so we don't flash the login page.
        setUser({ token }); 

        try {
          // 2. Verify with Backend
          const { data } = await API.get('/auth/me');
          
          // robust check: handles {data: user} or {user: ...} or just { ... }
          const userData = data.data || data.user || data;
          setUser(userData);
          
        } catch (error) {
          console.error("Auth check warning:", error);
          
          // CRITICAL FIX: Only logout if explicitly Unauthorized (401)
          // If it's a 404 or Network Error, we STAY logged in to avoid loops.
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token }); // Immediate update
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/admin/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};