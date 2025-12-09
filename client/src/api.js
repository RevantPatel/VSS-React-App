import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.MODE === 'production'
    ? ''
    : 'http://localhost:5000',
});

export default API;

// https://vss-backend.onrender.com