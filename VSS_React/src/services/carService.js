import API from '../api';

const API_URL = 'http://localhost:5000/api/cars/';

const listCar = async (carData, token) => {
  const config = {
    headers: {
      // The token is sent in the Authorization header
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.post(API_URL + 'list', carData, config);
  return response.data;
};

// Get all cars
const getCars = async (limit) => {
  let url = API_URL;
  if (limit) {
    url += `?limit=${limit}`; // Add the limit as a query parameter
  }
  const response = await API.get(url);
  return response.data;
};

const getCarById = async (id) => {
  const response = await API.get(API_URL + id);
  return response.data;
};

const carService = {
  listCar,
  getCars,
  getCarById,
};

export default carService;