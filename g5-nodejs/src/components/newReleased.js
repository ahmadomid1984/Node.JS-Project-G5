import React from "react";
import { Card, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import "../css/newReleased.css";

const NewReleasedCars = () => {
  // Sample data for demonstration
  const cars = [
    {
      id: 1,
      name: "BMW M3",
      price: "$65,000",
      image: "./images/car.avif", // Path to your car image
    },
    {
      id: 2,
      name: "Audi RS5",
      price: "$75,000",
      image: "./images/car.avif",
    },
    {
      id: 3,
      name: "Mercedes-Benz",
      price: "$70,000",
      image: "./images/car.avif",
    },
  ];

  return (
    <div>
      <h2>New Released Cars</h2>
      <Row className="newReleased">
        {cars.map((car) => (
          <div key={car.id} className="col-md-4 mb-3">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={car.image} alt={car.name} />
              <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Row>
                  <Col>
                    <Card.Text>Price: {car.price}</Card.Text>
                  </Col>
                  <Col xs="auto">
                    <a href={`/cars/${car.id}`}>
                      <span className="arrow">&#8594;</span> {/* Arrow icon */}
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default NewReleasedCars;
