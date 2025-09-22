import API from '../api';

const API_URL = 'http://localhost:5000/api/bookings/';

// Create a new booking
const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.post(API_URL, bookingData, config);
  return response.data;
};

const bookingService = {
  createBooking,
};

export default bookingService;