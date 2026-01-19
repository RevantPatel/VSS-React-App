const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("Incoming Data for Booking:", req.body);
    const { carId, startDate, endDate, totalPrice } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    // VALIDATION 1: Ensure startDate is in the future
    if (start < now) {
      throw new Error('Booking start date must be in the future');
    }

    // VALIDATION 2: Ensure endDate is after startDate
    if (end <= start) {
      throw new Error('End date must be after start date');
    }

    // LOGIC: Check for overlapping bookings
    // Overlap formula: (StartA < EndB) && (EndA > StartB)
    const existingBooking = await Booking.findOne({
      car: carId,
      status: { $ne: 'cancelled' },
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } }
      ]
    }).session(session);

    if (existingBooking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Car is already booked for these dates' });
    }

    const booking = new Booking({
      user: req.user._id,
      car: carId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'pending'
    });

    const createdBooking = await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(createdBooking);

  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error("Booking Error:", error);
    const statusCode = error.message && (error.message.includes('date') || error.message.includes('booked')) ? 400 : 500;
    res.status(statusCode).json({
      message: error.message || 'Server Error'
    });
  }
};

module.exports = { createBooking };