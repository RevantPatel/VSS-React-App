const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// The route is protected, only logged-in users can create bookings.
router.post('/', protect, createBooking);

module.exports = router;