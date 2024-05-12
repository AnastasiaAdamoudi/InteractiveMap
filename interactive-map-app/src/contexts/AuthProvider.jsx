import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const storedData = JSON.parse(localStorage.getItem('user_data'));

  useEffect(() => { 
    if (storedData) {
      const { token, userData } = storedData;
      setToken(token);
      setUserData(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken, newUserData) => {
    // Set the token in the Authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  
    localStorage.setItem('user_data', JSON.stringify({ token: newToken, userData: newUserData }));
    setToken(newToken);
    setUserData(newUserData);
    setIsAuthenticated(true);
  }

  const logout = () => {
    // Remove the Authorization header
    delete axios.defaults.headers.common['Authorization'];
  
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ token, userData, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);