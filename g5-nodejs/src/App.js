import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Cars from './components/cars';
import NewReleased from './components/newReleased';
import Footer from './components/footer';
import AboutUs from './components/aboutUs';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/about-us" element={
            <>
              <AboutUs />
              <Footer />
            </>
          } />
          <Route path="/" element={
            <>
              <Cars />
              <NewReleased />
              <Footer />
              <div className="copyRight"> &copy; 2024 Your Company Name</div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
