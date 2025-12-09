import React from 'react'
import './card.css'
import { NavLink } from 'react-router-dom'
import API from '../../api';

const Card = ({ car }) => {

    const imageUrl = car.imageUrl ? `${API}${car.imageUrl}` : '';

    return (
        <div>
            <div className="car-card">
                <div className="car-image">
                    <img src={imageUrl} alt={`${car.make} ${car.model}`} />
                </div>
                <div className="car-details">
                    <div className="car-title">
                        <h3>{car.make} {car.model}</h3>
                        <span className="car-price">₹{car.pricePerDay}</span>
                    </div>
                    <div className="car-info">
                        <span>{car.year}</span>
                        <span>Sedan</span>
                        <span>{car.location.coordinates ? "Near You" : car.location}</span>
                    </div>
                    <div className="car-features">
                        <span className="feature">Automatic</span>
                        <span className="feature">Bluetooth</span>
                        <span className="feature">Backup Camera</span>
                    </div>
                    <div className="car-actions">
                        <NavLink to={`/booking/${car._id}`} className="btn btn-primary">Rent Now</NavLink>
                        <button className="btn view-details-btn">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
