import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que la URL coincida con tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
