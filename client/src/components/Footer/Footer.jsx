import React from 'react'
import './footer.css'
import { NavLink, Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>VSS</h2>
            <p>Drive Your Way</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/rent">Rent a Car</NavLink></li>
                <li><NavLink to="/list">List Your Car</NavLink></li>
                <li><NavLink to="/how-it-works">How It Works</NavLink></li>
                <li><NavLink to="/about">About Us</NavLink></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><NavLink to="#">Help Center</NavLink></li>
                <li><NavLink to="#">Safety Center</NavLink></li>
                <li><NavLink to="#">Community Guidelines</NavLink></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><NavLink to="#">Terms of Service</NavLink></li>
                <li><NavLink to="#">Privacy Policy</NavLink></li>
                <li><NavLink to="#">Insurance Policy</NavLink></li>
              </ul>
            </div>
          </div>
          <div className="footer-social">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <NavLink to="#" className="social-icon"><span className="fab fa-facebook-f"></span></NavLink>
              <NavLink to="#" className="social-icon"><span className="fab fa-twitter"></span></NavLink>
              <NavLink to="#" className="social-icon"><span className="fab fa-instagram"></span></NavLink>
              <NavLink to="#" className="social-icon"><span className="fab fa-linkedin-in"></span></NavLink>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 VSS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer