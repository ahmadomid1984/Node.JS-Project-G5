import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/cart.css';

const Cart = () => {
   
  const cartIteamids = window.localStorage.getItem("cartItemIds");

  return (
    <Container>
      <Row>
      <h2>Shopping Cart(1 item in your cart)</h2>
    </Row>
    <Row>
      <Col col-md-2> <img src="/images/header.png" class="img-fluid" alt="Generic placeholder image" ></img></Col>
      <Col col-md-2>
      <p class="small text-muted mb-4 pb-2">Name</p>
      <p class="lead fw-normal mb-0">iPad Air</p>
      </Col>
      <Col col-md-2>
      <p class="small text-muted mb-4 pb-2">Color</p>
      <p class="lead fw-normal mb-0"><i class="fas fa-circle me-2" style={{ color: "#fdd8d2" }}></i>pink rose</p>
      </Col>
      <Col col-md-2>
      <p class="small text-muted mb-4 pb-2">Quantity</p>
      <p class="lead fw-normal mb-0">1</p>
      </Col>
      <Col col-md-2>
      <p class="small text-muted mb-4 pb-2">Price</p>
      <p class="lead fw-normal mb-0">$799</p>
      </Col>
      <Col col-md-2> 
      <p class="small text-muted mb-4 pb-2">Total</p>
      <p class="lead fw-normal mb-0">$799</p>
      </Col>
    </Row>
    <Row>
      
      
    </Row>
  </Container>



  );
};

export default Cart;