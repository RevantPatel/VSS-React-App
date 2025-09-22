import API from '../api';

const API_URL = 'http://localhost:5000/api/users/';

// Register user
const register = async (userData) => {
  const response = await API.post(API_URL + 'register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await API.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

// List Car
const listCar = async (carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.post(API_URL.replace('users', 'cars') + 'list', carData, config);
  return response.data;
};

export default authService;