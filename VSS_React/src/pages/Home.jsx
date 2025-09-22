import React from 'react';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import carService from '../services/carService';
import '../App.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Fetch only 9 cars for the homepage
        const carData = await carService.getCars(9);
        setCars(carData);
      } catch (err) {
        // ... error handling
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <Hero />
      <div className="body">
        <h2>Available Cars</h2>
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
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <NavLink to="/rent" className="btn btn-primary">View All Cars</NavLink>
      </div>
    </>
  );
};

export default Home;