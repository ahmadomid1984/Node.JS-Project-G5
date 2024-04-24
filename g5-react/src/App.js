
import React, {useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Footer from './components/footer';
import AboutUs from './components/aboutUs';
import ContactUs from './components/contactUs';
import Cars from './components/cars';
import Map from './components/map';
import "./App.css";
import CarDetail from './components/carDetails';
import Cart from './components/cart';

function App() {


  return (

    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Cars />} />
          <Route path="/car" element={<CarDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
        <div className="copyRight"> &copy; 2024 Your Company Name</div>
      </div>
    </Router>
    
  );
}


function Home() {
  return (
    <>
      <Cars />
      <Map />
    </>
  );
}

export default App;

