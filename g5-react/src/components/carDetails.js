import React from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "../css/carDetails.css";

function CarDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = (id) => {
    navigate('/booking', { state: { carId: id } });
  };

  return (
    <Container>
      <Row>
        <Row>
          <Col>
            {" "}
            <img src="/images/bmw.jpg" alt="" className="img-fluid" />
          </Col>
          <Col>
            <div className="details">
              <h2>{location.state.car.car_name}</h2>
              <p>{location.state.car.description}</p>
              <p>
                <strong>Price: </strong> € {location.state.car.price}
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                {location.state.car.available_count > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>
              <button
                onClick={() => booking(location.state.car.cars_id)}
                className="btn btn-primary"
              >
                Book a test drive
              </button>
            </div>
          </Col>
        </Row>
        <Row className="features">
          <h2>Car details</h2>
          <Col>
            <p>
              <strong>Body Style</strong>{" "}
              {location.state.car.features.BodyStyle}
            </p>
            <p>
              <strong>Car Type</strong>{" "}
              {location.state.car.features.CarType.trim()}
            </p>
            <p>
              <strong>Color</strong> {location.state.car.features.CarColors}
            </p>
            <p>
              <strong>Fuel Type</strong> {location.state.car.features.Fuel}
            </p>
          </Col>
          <Col>
            <p>
              <strong>Transmission</strong> {location.state.car.features.Gear}
            </p>
            <p>
              <strong>Seating</strong> {location.state.car.features.TotalSeats} -seats
            </p>
            <p>
              <strong>Engine Capacity</strong>{" "}
              {location.state.car.features.EngineCapacity}
            </p>
            <p>
              <strong>Engine</strong> {location.state.car.features.Engine}
            </p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default CarDetail;
