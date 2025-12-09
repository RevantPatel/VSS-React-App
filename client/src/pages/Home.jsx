import React from 'react';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import Card from '../components/Card/Card';
import carService from '../services/carService';
import '../App.css';
import { NavLink } from 'react-router-dom';
import CarsNearMe from '../components/CarsNearMe/CarsNearMe';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carData = await carService.getCars(9);
        setCars(carData);
      } catch (err) {
        //errors
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <Hero />

      <section className="feature-section">
        <div className="home-container">
          <h2 className="section-title">
            Find Cars <span className="highlight">Near You</span>
          </h2>

          <p className="section-subtitle">
            Use your current location to find available vehicles within 10km.
          </p>
          
          <div className="near-me-wrapper">
            <CarsNearMe /> 
          </div>
        </div>
      </section>

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