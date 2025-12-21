import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SECURITY UPDATE: Check sessionStorage instead of localStorage
    const token = sessionStorage.getItem('token');
    
    if (token) {
      // If token exists, try to fetch user data
      // (Optional: You can add an API call here to verify token validity)
      setUser({ token }); 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user } = response.data; // Adjust based on your actual API response structure
      
      // SECURITY UPDATE: Save to sessionStorage (dies when tab closes)
      sessionStorage.setItem('token', token);
      
      setUser(user || { token }); // specific user data if available
      return { success: true };
    } catch (error) {
      console.error("Login error", error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const logout = () => {
    // SECURITY UPDATE: Clear sessionStorage
    sessionStorage.removeItem('token');
    setUser(null);
    // Optional: force reload to clear any memory states
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};