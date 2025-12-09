import React, { useState } from 'react';
import carService from '../../services/carService';
import Card from '../Card/Card';
import './CarsNearMe.css';

const NearMeSearch = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleNearMeClick = () => {
    setLoading(true);
    setError('');
    setHasSearched(true);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const result = await carService.getCarsNearMe(lat, lng);
          setCars(result.data || []);
          setLoading(false);
        } catch (e) {
          setError(`Failed to fetch cars: ${e.message}`);
          setLoading(false);
        }
      },
      (error) => {
        alert('Location permission denied. Please enable location access in your browser settings.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="near-me-container">
      <button
        onClick={handleNearMeClick}
        className="find-btn"
        disabled={loading}
      >
        {loading ? "Locating..." : "📍 Find Cars Near Me"}
      </button>

      {error && <p className="error-msg">{error}</p>}

      <div className="cars-grid">
        {/* Scenario 1: Search done AND cars found */}
        {cars.length > 0 && (
          cars.map((car) => (
            <Card key={car._id || car.id} car={car} />
          ))
        )}

        {/* Scenario 2: Search done BUT zero cars found */}
        {hasSearched && cars.length === 0 && !loading && !error && (
          <div className="no-data-msg">
            <p>🚫 No cars found within 10km.</p>
            <p className="text-sm">Try moving to a different location.</p>
          </div>
        )}

        {/* Scenario 3: Haven't searched yet (Default State) */}
        {!hasSearched && !loading && !error && (
          <div className="no-data-msg">
            <p>👋 Click the button above to find cars near you.</p>
            <p className="text-sm text-gray-500">(We need your location permission)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearMeSearch;