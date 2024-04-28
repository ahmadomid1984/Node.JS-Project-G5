import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Main Site Components
import NavBar from './siteComponents/navBar';
import Footer from './siteComponents/footer';
import AboutUs from './siteComponents/aboutUs';
import ContactUs from './siteComponents/contactUs';
import Cars from './siteComponents/cars';
import Map from './siteComponents/map';
import CarDetail from './siteComponents/carDetails';
import Booking from './siteComponents/booking';
import AdminBooking from './siteComponents/bookingAdmin';

// Admin Components
import AdminDashboard from './components/AdminDashboard';
import CreateCar from './components/CreateCar';
import UpdateCar from './components/UpdateCar';
import Features from './components/Features';
import Register from './components/register';
import Login from './components/login';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          {/* Main site routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car" element={<CarDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/register" element={<Register />} /> {/* Moved out of /admin */}
          <Route path="/login" element={<Login />} /> {/* Moved out of /admin */}

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<CreateCar />} />
          <Route path="/admin/update/:id" element={<UpdateCar />} />
          <Route path="/admin/features/:id" element={<Features />} />
          <Route path="admin/bookings" element={<AdminBooking />} />
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