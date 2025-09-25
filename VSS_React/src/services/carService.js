import API from '../api';

const listCar = async (carData, token) => {
  const config = {
    headers: {
      // The token is sent in the Authorization header
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.post('/api/cars/list', carData, config);
  return response.data;
};

// Get all cars
const getCars = async (limit) => {
  let url = '/api/cars';
  if (limit) {
    url += `?limit=${limit}`; // Add the limit as a query parameter
  }
  const response = await API.get(url);
  return response.data;
};

const getCarById = async (id) => {
  const response = await API.get(`/api/cars/${id}`);
  return response.data;
};

const carService = {
  listCar,
  getCars,
  getCarById,
};

export default carService;