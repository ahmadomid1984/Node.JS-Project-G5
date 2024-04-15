// src/components/NavBar.js
import React from 'react';
import '../css/navBar.css';

function NavBar() {
    return (
        <nav className="navBar">
        <div>
            <a href="#home" className="navItem navItem-active">Home</a>
            <a href="#about" className="navItem">About Us</a>
            <a href="#contact" className="navItem">Contact Us</a>
        </div>
        <div className="navBar-right">
            <a href="#signup" className="navItem sign-up">Sign-up</a>
            <a href="#login" className="navItem login">Login</a>
        </div>
        </nav>
    );
}

export default NavBar;
