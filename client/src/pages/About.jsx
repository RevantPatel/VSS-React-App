import React from 'react';
import { NavLink } from 'react-router-dom';
import './about.css'; // This will now apply the correct styles

const About = () => {
  return (
    <div>
      <section className="page-banner">
        <h1>About VSS</h1>
        <p>Learn more about our mission and story</p>
      </section>

      <section className="about-page">
        <div className="container">
          <div className="about-story">
            <h2 className="section-title">Our Story</h2>
            <div className="about-content">
              <div className="about-text">
                <p>VSS was founded in 2023 with a simple mission: to make car rental more accessible, affordable, and sustainable for everyone. We recognized that many car owners have vehicles sitting idle for days or weeks, while others struggle to find affordable rental options.</p>
                <p>Our platform bridges this gap by connecting car owners with people who need a vehicle. This peer-to-peer model not only provides car owners with an opportunity to earn extra income but also gives renters access to a wider variety of cars at competitive prices.</p>
                <p>What started as a small operation in Mumbai has now expanded to over 100 cities across India, with thousands of cars listed and tens of thousands of happy customers.</p>
              </div>
              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216" alt="VSS Team Meeting" />
              </div>
            </div>
          </div>

          <div className="mission-vision">
            <div className="mission-box">
              <h3><i className="fas fa-bullseye"></i> Our Mission</h3>
              <p>To revolutionize the car rental industry by creating a community-driven platform that maximizes vehicle utilization, reduces the overall number of cars on the road, and provides economic opportunities to car owners.</p>
            </div>
            <div className="mission-box">
              <h3><i className="fas fa-eye"></i> Our Vision</h3>
              <p>A world where accessing a car is as easy as booking a ride, where car ownership is optional, and where the sharing economy helps reduce our environmental footprint while building stronger communities.</p>
            </div>
          </div>

          <div className="stats-section">
            <h2 className="section-title">VSS by the Numbers</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Cars Listed</div>
                <p>From compact hatchbacks to luxury sedans, our platform offers a diverse range of vehicles to suit every need and budget.</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">20,000+</div>
                <div className="stat-label">Happy Customers</div>
                <p>Our growing community of renters and car owners consistently rate their VSS experience 4.8 out of 5 stars.</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Cities</div>
                <p>We're rapidly expanding across India, making car sharing accessible to more communities every month.</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">₹50M+</div>
                <div className="stat-label">Earned by Car Owners</div>
                <p>Our platform has helped car owners earn significant additional income from their vehicles when they're not in use.</p>
              </div>
            </div>
          </div>

          <div className="cta-box">
            <h3>Ready to join the VSS community?</h3>
            <div className="cta-buttons">
              <NavLink to="/rent" className="btn">Rent a Car</NavLink>
              <NavLink to="/list" className="btn">List Your Car</NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;