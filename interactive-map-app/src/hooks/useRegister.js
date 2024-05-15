import { useAuth } from '../contexts/AuthProvider';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useRegister = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post('http://localhost:3000/register', values);
      const data = response.data;

      if (response.status === 201) {
        console.log(`User registered successfully: ${data.userData.username}`);

        // Save the token and user data to cookies
        Cookies.set('token', data.token, { expires: 1 / 24 });
        Cookies.set('userData', JSON.stringify(data.userData), { expires: 1 / 24 });

        // Login the user
        login(data.token, data.userData);
        console.log(`Server response status: ${response.status}`);
      } else {
        setError(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ message: 'An unexpected error occurred during registration.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, error, loading };
};

export default useRegister;