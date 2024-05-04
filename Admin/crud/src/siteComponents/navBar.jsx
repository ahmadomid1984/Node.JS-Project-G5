import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navBar.css';

function NavBar() {
    return (
        <nav className="navBar" id='mainNavigation' aria-label="Main navigation">
            <div className="navBar-left" id='home'>
                <Link to="/" className="navItem navItem-active" aria-current= "page" aria-label="home">Home</Link>
                <Link to="/about-us" className="navItem"  id='aboutUs' aria-label="about us">About Us</Link>
                <Link to="/contact-us" className="navItem" id='contactUs' aria-label="contact us">Contact Us</Link>
            </div>
        </nav>
    );
}

export default NavBar;
