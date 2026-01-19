
const asyncHandler = require('../middleware/asyncHandler');
const Booking = require('../models/Booking');
const crypto = require('crypto');

// @desc    Simulate Creating an Order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    //Generate a fake Order ID that looks like Razorpay's
    const orderId = `order_${crypto.randomBytes(10).toString('hex')}`;

    res.json({
        id: orderId,
        currency: "INR",
        amount: amount * 100,// Razorpay always expects paise convert to rupee
        status: "created"
    });

});

// @desc    Verify Payment (The Handshake)
// @route   POST /api/payment/verify
const verifyPayment = asyncHandler(async (req, res) => {
    const { bookingId, paymentId } = req.body;
    const booking = await Booking.findById(bookingId);

   if (!booking) {
        res.status(404);
        throw new Error('Booking not found in database');
    }

    booking.status = 'confirmed';
    booking.paymentId = paymentId || `pay_${crypto.randomBytes(10).toString('hex')}`;
    await booking.save();

    res.json({ message: "Payment Verified & Booking Confirmed", success: true });
});

module.exports = { createOrder, verifyPayment };