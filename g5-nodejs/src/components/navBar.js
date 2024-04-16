import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navBar.css';

function NavBar() {
    return (
        <nav className="navBar">
            <div>
                <Link to="/" className="navItem navItem-active">Home</Link>
                <Link to="/about-us" className="navItem">About Us</Link>
                <Link to="/contact" className="navItem">Contact Us</Link>
            </div>
            <div className="navBar-right">
                <Link to="/signup" className="navItem sign-up">Sign-up</Link>
                <Link to="/login" className="navItem login">Login</Link>
            </div>
        </nav>
    );
}

export default NavBar;
