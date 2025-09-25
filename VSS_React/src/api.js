import axios from 'axios';

const RENDER_URL = 'https://vss-backend.onrender.com';

const API = axios.create({
  baseURL: import.meta.env.MODE === 'production' 
    ? RENDER_URL 
    : 'http://localhost:5000',
});

export default API;