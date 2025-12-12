import React, { useState } from 'react';
import API from '../../api';
import './Payment.css';

const Payment = ({ booking, onClose, onSuccess }) => {
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    try {

      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Pass the ID card
        },
      };

      // Step 1: Tell Backend to create a fake order
      const { data: order } = await API.post('/api/payment/create-order', {
        amount: booking.totalPrice,
        bookingId: booking._id
      }, config);

      console.log("Order Created:", order);

      // Step 2: Simulate the User typing their card details
      setTimeout(async () => {

        // Step 3: Tell Backend to Confirm the Booking
        await API.post('/api/payment/verify', {
          bookingId: booking._id,
          paymentId: `pay_sim_${Date.now()}`
        }, config);

        // Step 4: Success!
        setProcessing(false);
        alert("Payment Successful! Booking Confirmed.");
        onSuccess();
      }, 2000);

    } catch (error) {
      console.error(error);
      alert("Payment Failed. Try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="payment-overlay">
      <div className="payment-box">
        <h2>Confirm Booking</h2>

        <p className="amount">Total: ₹{booking.totalPrice}</p>
        <p className="note">Car: {booking.car?.make} {booking.car?.model}</p>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="pay-btn"
        >
          {processing ? "Processing Payment..." : "Pay Now (Simulate)"}
        </button>

        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Payment;