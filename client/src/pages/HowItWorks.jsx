import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './howitworks.css';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('renter');

  return (
    <div>
      <section className="page-banner">
        <h1>How It Works</h1>
        <p>A simple and secure process for renters and car owners.</p>
      </section>

      <div className="how-it-works-page">
        <div className="container">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'renter' ? 'active' : ''}`}
              onClick={() => setActiveTab('renter')}
            >
              For Renters
            </button>
            <button
              className={`tab-btn ${activeTab === 'owner' ? 'active' : ''}`}
              onClick={() => setActiveTab('owner')}
            >
              For Car Owners
            </button>
          </div>

          <div className={`tab-content ${activeTab === 'renter' ? 'active' : ''}`}>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Find the Perfect Car</h3>
                  <p>Browse our diverse selection of cars. Use filters to narrow down your search by location, car type, and price to find the vehicle that fits your needs.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Book & Confirm</h3>
                  <p>Select your desired dates, review the total price, and securely book the car. You will receive a confirmation once the owner approves your request.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Pick Up & Drive</h3>
                  <p>Meet the car owner at the agreed location, present your valid driver's license, and get the keys. Enjoy your trip!</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`tab-content ${activeTab === 'owner' ? 'active' : ''}`}>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>List Your Car for Free</h3>
                  <p>Create a listing for your car in minutes. Add photos, set your price, and describe your vehicle's features. It's completely free to list.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Approve Booking Requests</h3>
                  <p>You'll receive notifications when a renter requests to book your car. Review their profile and approve the booking at your convenience.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Handover & Earn Money</h3>
                  <p>Coordinate a time and place to hand over the keys to the renter. After the trip is completed, your earnings are transferred directly to you.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-box" style={{ marginTop: '4rem' }}>
            <h3>Start Your Journey with VSS Today</h3>
            <div className="cta-buttons">
              <NavLink to="/rent" className="btn">Find a Car</NavLink>
              <NavLink to="/list" className="btn">List Your Car</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;