// src/App.js
import React from "react";
import NavBar from "./components/navBar";
import Cars from "./components/cars";
import NewReleasedCars from "./components/newReleased";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* You may need a separate component or div for the main featured vehicle image */}
      <Cars />
      <NewReleasedCars />
      <Footer />
      <div className="copyRight"> &copy; 2024 Your Company Name</div>
    </div>
  );
}

export default App;
