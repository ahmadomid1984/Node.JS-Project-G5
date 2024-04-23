import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/carDetails.css";

function CarDetail() {
  const location = useLocation();
  const addToCart = () => {
    console.log("Added to cart:", car);
  }

  return (
    <Container>
      <Row>
      <h1>{location.state.car.car_name}</h1>
      <Col>
          <img src="/images/bmw.jpg" alt="" className="img-fluid"/>
          </Col>
          <Col>
          <div className="features">
          <p><strong>Body Style</strong> {location.state.car.features.BodyStyle}</p>
            <p><strong>Car Type</strong> {location.state.car.features.CarType.trim()}</p>
            <p><strong>Colors</strong> {location.state.car.features.CarColors}</p>
            <p><strong>Fuel Type</strong> {location.state.car.features.Fuel}</p>
            <p><strong>Transmission</strong> {location.state.car.features.Gear}</p>
            <p><strong>Total Seats</strong> {location.state.car.features.TotalSeats}</p>
            <p><strong>Engine Capacity</strong> {location.state.car.features.EngineCapacity}</p>
            <p><strong>Engine</strong> {location.state.car.features.Engine}</p>
            
          
          <div className='price'><p><strong>Price</strong> € {location.state.car.price}</p></div>
          <button onClick={addToCart} className="btn btn-primary">
            Add to Cart
          </button>
          </div>
          </Col>
        </Row>
      </Container>
  );
}

export default CarDetail;



