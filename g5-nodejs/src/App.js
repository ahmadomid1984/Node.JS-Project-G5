// src/App.js
import React from 'react';
import NavBar from './components/navBar';
import Cars from './components/cars';
import NewReleased from './components/newReleased';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* You may need a separate component or div for the main featured vehicle image */}
      <Cars />
      <NewReleased />
      <Footer />
    </div>
  );
}

export default App;
