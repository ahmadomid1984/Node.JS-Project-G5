import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navBar.css';

function NavBar() {
    return (
        <nav className="navBar">
            <div className="navBar-left">
                <Link to="/" className="navItem navItem-active">Home</Link>
                <Link to="/about-us" className="navItem">About Us</Link>
                <Link to="/contact-us" className="navItem">Contact Us</Link>
            </div>
        </nav>
    );
}

export default NavBar;