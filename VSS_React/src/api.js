import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.MODE === 'production'
    ? 'https://vss-backend.onrender.com'
    : '',
});

export default API;