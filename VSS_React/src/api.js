import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vss-backend.onrender.com',
});

export default API;