const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { car, startDate, endDate, totalPrice } = req.body;

    const booking = new Booking({
      user: req.user.id, // From our 'protect' middleware
      car,
      startDate,
      endDate,
      totalPrice,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createBooking };