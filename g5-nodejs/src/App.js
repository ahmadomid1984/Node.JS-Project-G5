// src/App.js
import React from 'react';
import NavBar from './components/navBar';
import Cars from './components/cars';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* You may need a separate component or div for the main featured vehicle image */}
      <Cars />
    </div>
  );
}

export default App;
