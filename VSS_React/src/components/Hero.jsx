import React from 'react'
import './hero.css'
import { NavLink } from 'react-router-dom'

const Hero = () => {
    return (
        <div>
            <section id="home" className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Vehicle Sharing System</h1>
                        <p>Rent a car or earn money by listing your vehicle on VSS</p>
                        <div className="hero-buttons">
                            <NavLink to="/rent" className="btn btn-primary">Rent a Car</NavLink>
                            <NavLink to="/list" className="btn btn-secondary">List Your Car</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
