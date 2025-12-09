import React, { useState, useEffect } from 'react'
import './navbar.css'
import { NavLink, useNavigate  } from 'react-router-dom';
import authService from '../../services/authService';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
        window.location.reload();
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    return (
        <header className='nav'>
            <div className="container">
                <div className="logo">
                    <h1>VSS</h1>
                </div>
                <nav>
                    <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/rent">Rent a Car</NavLink></li>
                        <li><NavLink to="/list">List Your Car</NavLink></li>
                        <li><NavLink to="/how-it-works">How It Works</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        {user ? (
                            <li>
                                <button onClick={handleLogout} className="btn">Logout</button>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/login" id="login">Login</NavLink>
                            </li>
                        )}
                    </ul>
                    <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar