import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Footer from './components/footer';
import AboutUs from './components/aboutUs';
import ContactUs from './components/contactUs';
import Cars from './components/cars';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer /> {/* Render Footer component outside of Routes */}
        <div className="copyRight"> &copy; 2024 Your Company Name</div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Cars />
    </>
  );
}

export default App;