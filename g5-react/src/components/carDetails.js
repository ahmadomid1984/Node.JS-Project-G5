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
      <Row>
        <Col> <img src="/images/bmw.jpg" alt="" className="img-fluid"/></Col>
        <Col  >
          <div className='details'>
        <h2>{location.state.car.car_name}</h2>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
        <p><strong>Price: </strong> € {location.state.car.price}</p>
        <p><strong>Availability:</strong> {location.state.car.available_count > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <button onClick={addToCart} className="btn btn-primary">
            Add to Cart
          </button>
          </div>
        </Col>
      </Row>
          <Row className="features">
          <h2>Car details</h2>
        <Col>
        <p><strong>Body Style</strong> {location.state.car.features.BodyStyle}</p>
            <p><strong>Car Type</strong> {location.state.car.features.CarType.trim()}</p>
            <p><strong>Colors</strong> {location.state.car.features.CarColors}</p>
            <p><strong>Fuel Type</strong> {location.state.car.features.Fuel}</p>
        </Col>
        <Col>
        <p><strong>Transmission</strong> {location.state.car.features.Gear}</p>
            <p><strong>Total Seats</strong> {location.state.car.features.TotalSeats}</p>
            <p><strong>Engine Capacity</strong> {location.state.car.features.EngineCapacity}</p>
            <p><strong>Engine</strong> {location.state.car.features.Engine}</p>
        </Col>
      </Row>
          
        </Row>
      </Container>
  );
}

export default CarDetail;



