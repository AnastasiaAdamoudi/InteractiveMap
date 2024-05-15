import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(null);
  // const [userData, setUserData] = useState(null);

  // const storedData = JSON.parse(localStorage.getItem('user_data'));

  // useEffect(() => { 
  //   if (storedData) {
  //     const { token, userData } = storedData;
  //     setToken(token);
  //     setUserData(userData);
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // const login = (newToken, newUserData) => {
  //   // Set the token in the Authorization header for future requests
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  
  //   localStorage.setItem('user_data', JSON.stringify({ token: newToken, userData: newUserData }));
  //   setToken(newToken);
  //   setUserData(newUserData);
  //   setIsAuthenticated(true);
  // }

  // const logout = () => {
  //   // Remove the Authorization header
  //   delete axios.defaults.headers.common['Authorization'];
  
  //   localStorage.removeItem('user_data');
  //   setToken(null);
  //   setUserData(null);
  //   setIsAuthenticated(false);
  // }


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const storedToken = Cookies.get('token');
      const storedUserData = Cookies.get('userData');
  
      console.log('Stored token:', storedToken);
      console.log('Stored userData:', storedUserData);
  
      if (storedToken && storedUserData) {
        try {
          const decodedUserData = decodeURIComponent(storedUserData);
          console.log('Decoded userData:', decodedUserData);
  
          const parsedUserData = JSON.parse(decodedUserData);
          console.log('Parsed userData:', parsedUserData);
  
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setIsAuthenticated(true);
          setUserData(parsedUserData);
        } catch (error) {
          console.error('Error parsing userData cookie:', error);
        }
      }
    }, []);
  
    const login = (newToken, newUserData) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      Cookies.set('token', newToken, { expires: 1 }); // 1 day expiration
      Cookies.set('userData', encodeURIComponent(JSON.stringify(newUserData)), { expires: 1 }); // 1 day expiration
      setIsAuthenticated(true);
      setUserData(newUserData);
    };
    
    const logout = () => {
      Cookies.remove('token');
      Cookies.remove('userData');
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
      setUserData(null);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
        {children}
      </AuthContext.Provider>
    );
  }
  

export const useAuth = () => useContext(AuthContext);