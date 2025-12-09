import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import carService from '../services/carService';
import API from '../api';
import LocationPicker from '../components/LocationPicker/LocationPicker'; // Ensure this path is correct
import './form.css'; 

const ListCar = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // --- Feature 1: Image Upload ---
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await API.post('/api/upload', formData, config);
      setValue('imageUrl', data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Image upload failed');
    }
  };

  // --- Feature 2: GPS Helper (Centers map and fills coords) ---
  const handleCurrentLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setValue('latitude', latitude);
        setValue('longitude', longitude);
        alert(`GPS Detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setLoadingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve location. Please allow permissions.");
        setLoadingLocation(false);
      }
    );
  };

  // --- Feature 3: Map Drag Handler ---
  const handleMapSelect = (lat, lng) => {
    setValue('latitude', lat);
    setValue('longitude', lng);
  };

  // --- Feature 4: Submit Logic (Transform to GeoJSON) ---
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.token) {
        alert('You must be logged in to list a car.');
        navigate('/login');
        return;
      }

      // Validation: Location is mandatory
      if (!data.latitude || !data.longitude) {
        alert("Please set a location by dragging the pin on the map.");
        setIsSubmitting(false);
        return;
      }

      // Construct Payload matching Mongoose Schema
      const carPayload = {
        make: data.make,
        model: data.model,
        year: data.year,
        pricePerDay: data.pricePerDay,
        imageUrl: data.imageUrl,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(data.longitude), // Longitude First!
            parseFloat(data.latitude)   // Latitude Second
          ]
        }
      };

      await carService.listCar(carPayload, user.token);
      alert('Car listed successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to list car');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>List Your Car</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* Basic Car Info */}
        <div className="form-group">
          <label htmlFor="make">Make</label>
          <input 
            {...register('make', { required: 'Make is required' })} 
            placeholder="e.g. Toyota" 
          />
          {errors.make && <p className="error-message">{errors.make.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input 
            {...register('model', { required: 'Model is required' })} 
            placeholder="e.g. Camry" 
          />
          {errors.model && <p className="error-message">{errors.model.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input 
            type="number" 
            {...register('year', { required: 'Year is required' })} 
          />
          {errors.year && <p className="error-message">{errors.year.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="pricePerDay">Price per Day (₹)</label>
          <input 
            type="number" 
            {...register('pricePerDay', { required: 'Price is required' })} 
          />
          {errors.pricePerDay && <p className="error-message">{errors.pricePerDay.message}</p>}
        </div>

        {/* --- MAP LOCATION SECTION (Replaces old text input) --- */}
        <div className="location-box">
          <label className="location-label">
            Pin Car Location (Drag Marker)
          </label>
          
          <button 
            type="button" 
            onClick={handleCurrentLocation}
            className="gps-btn"
          >
            {loadingLocation ? "Detecting..." : "📍 Center Map on My GPS"}
          </button>

          {/* Interactive Map */}
          <LocationPicker onLocationSelect={handleMapSelect} />

          {/* Read-only Coordinates */}
          <div className="coords-row">
            <div className="coords-group">
              <label className="coords-label">Latitude</label>
              <input 
                {...register('latitude')} 
                readOnly 
                className="coords-input" 
                placeholder="0.0000"
              />
            </div>
            <div className="coords-group">
              <label className="coords-label">Longitude</label>
              <input 
                {...register('longitude')} 
                readOnly 
                className="coords-input" 
                placeholder="0.0000"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image-file">Car Image</label>
          <input 
            type="hidden" 
            {...register('imageUrl', { required: 'Image is required' })} 
          />
          <input 
            type="file" 
            id="image-file" 
            onChange={uploadFileHandler} 
          />
          {uploading && <p className="upload-status">Uploading image...</p>}
          {errors.imageUrl && <p className="error-message">{errors.imageUrl.message}</p>}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '10px' }} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Listing Car...' : 'List My Car'}
        </button>

      </form>
    </div>
  );
};

export default ListCar;