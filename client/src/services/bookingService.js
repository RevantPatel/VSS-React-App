import API from '../api';

// Create a new booking
const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.post('/api/bookings', bookingData, config);
  return response.data;
};

const bookingService = {
  createBooking,
};

export default bookingService;