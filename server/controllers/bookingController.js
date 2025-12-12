const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    console.log("Incoming Data for Booking:", req.body);
    const { carId, startDate, endDate, totalPrice } = req.body;

    const booking = new Booking({
      user: req.user._id,
      car: carId,
      
      startDate,
      endDate,
      totalPrice,
      status: 'pending'
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
    
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ 
      message: error.message || 'Server Error' 
    });
  }
};

module.exports = { createBooking };