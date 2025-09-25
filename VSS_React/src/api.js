import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.MODE === 'production'
    ? RENDER_URL
    : '',
});

export default API;