import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import carService from '../services/carService';
import '../App.css';

const Rent = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        // Fetch all cars (no limit)
        const carData = await carService.getCars();
        setCars(carData);
      } catch (err) {
        setError('Failed to fetch car listings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCars();
  }, []);

  return (
    <div className="body">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>All Available Cars</h2>
      {loading && <p>Loading cars...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div className="car-listings">
          {cars.length > 0 ? (
            cars.map((car) => <Card key={car._id} car={car} />)
          ) : (
            <p>No cars available for rent right now.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Rent;