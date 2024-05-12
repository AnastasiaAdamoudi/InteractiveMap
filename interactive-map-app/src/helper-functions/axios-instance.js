import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode.default(token);
        // const userId = decodedToken.userId;

        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;