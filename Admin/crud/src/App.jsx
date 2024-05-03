import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import NavBar from './siteComponents/navBar';
import Footer from './siteComponents/footer';
import AboutUs from './siteComponents/aboutUs';
import ContactUs from './siteComponents/contactUs';
import Cars from './siteComponents/cars';
import Map from './siteComponents/map';
import CarDetail from './siteComponents/carDetails';
import Booking from './siteComponents/booking';
import AdminDashboard from './components/AdminDashboard';
import CreateCar from './components/CreateCar';
import UpdateCar from './components/UpdateCar';
import Features from './components/Features';
import Register from './components/register';
import Login from './components/login';
import AdminBooking from './siteComponents/bookingAdmin';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  const location = useLocation();
  
  // Function to check if the current location should not show NavBar and Footer
  const shouldHideNavAndFooter = () => {
    const noNavFooterRoutes = ['/login', '/register', '/admin'];
    return noNavFooterRoutes.some(route => location.pathname.startsWith(route));
  };

  return (
    <div className="App">
      {!shouldHideNavAndFooter() && <NavBar />}
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car" element={<CarDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/create" element={<ProtectedRoute><CreateCar /></ProtectedRoute>} />
        <Route path="/admin/update/:id" element={<ProtectedRoute><UpdateCar /></ProtectedRoute>} />
        <Route path="/admin/features/:id" element={<ProtectedRoute><Features /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><AdminBooking /></ProtectedRoute>} />
      </Routes>
                              
      {!shouldHideNavAndFooter() && <Footer />}
      {!shouldHideNavAndFooter() && <div className="copyRight" role="complementary">&copy; 2024 Your Company Name</div>}

    </div>
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
