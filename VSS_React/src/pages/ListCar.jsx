import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import carService from '../services/carService';
import './form.css';
import API from '../api';

const ListCar = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await API.post('/api/upload', formData, config);
      setValue('imageUrl', data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.token) {
        alert('You must be logged in to list a car.');
        navigate('/login');
        return;
      }

      await carService.listCar(data, user.token);

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
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log('Validation Errors:', errors))}>
        <div className="form-group">
          <label htmlFor="make">Make (e.g., Toyota)</label>
          <input {...register('make', { required: 'Make is required' })} />
          {errors.make && <p className="error-message">{errors.make.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="model">Model (e.g., Camry)</label>
          <input {...register('model', { required: 'Model is required' })} />
          {errors.model && <p className="error-message">{errors.model.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input type="number" {...register('year', { required: 'Year is required' })} />
          {errors.year && <p className="error-message">{errors.year.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="pricePerDay">Price per Day (₹)</label>
          <input type="number" {...register('pricePerDay', { required: 'Price is required' })} />
          {errors.pricePerDay && <p className="error-message">{errors.pricePerDay.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="location">Location (e.g., Mumbai)</label>
          <input {...register('location', { required: 'Location is required' })} />
          {errors.location && <p className="error-message">{errors.location.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image-file">Image</label>
          <input type="hidden" {...register('imageUrl', { required: 'Image is required' })} />
          <input type="file" id="image-file" onChange={uploadFileHandler} />
          {uploading && <p>Uploading...</p>}
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'List My Car'}
        </button>
      </form >
    </div>
  );
};

export default ListCar;