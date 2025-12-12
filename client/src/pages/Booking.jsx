import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import carService from '../services/carService';
import bookingService from '../services/bookingService';
import Payment from '../components/Payment/Payment';
import './form.css';

const Booking = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showPayment, setShowPayment] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  // Fetch Car Details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await carService.getCarById(id);
        setCar(data);
      } catch (err) {
        setError('Failed to fetch car details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  // Calculate Price Helper
  const calculateTotalPrice = () => {
    if (watchStartDate && watchEndDate && car) {
      const start = new Date(watchStartDate);
      const end = new Date(watchEndDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays * car.pricePerDay : 0;
    }
    return 0;
  };

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      alert('Please login to book a car.');
      navigate('/login');
      return;
    }

    const price = calculateTotalPrice();
    if (price <= 0) {
      alert("Please select valid dates");
      return;
    }

    const bookingPayload = {
      carId: car._id,
      startDate: data.startDate,
      endDate: data.endDate,
      totalPrice: price,
    };

    try {
      const newBooking = await bookingService.createBooking(bookingPayload, user.token);
      console.log("Booking Created (Pending):", newBooking);

      setBookingDetails(newBooking);
      setShowPayment(true);
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to initialize booking.');
    }
  };

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="form-container">
      <h1>Book: {car.make} {car.model}</h1>
      <p><strong>Price:</strong> ₹{car.pricePerDay}/day</p>

      {/* The Booking Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" {...register('startDate', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input type="date" {...register('endDate', { required: true })} />
        </div>

        <h3 style={{ margin: '20px 0', color: '#16a34a' }}>
          Total Price: ₹{calculateTotalPrice()}
        </h3>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Proceed to Payment
        </button>
      </form>

      {/* --- THE PAYMENT MODAL (Pop-up) --- */}
      {showPayment && bookingDetails && (
        <Payment 
          booking={bookingDetails} 
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            alert("🎉 Booking Confirmed! Redirecting home...");
            navigate('/');
          }} 
        />
      )}
    </div>
  );
};

export default Booking;