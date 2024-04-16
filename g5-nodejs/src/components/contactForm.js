import React from "react";
import { Form, Button } from "react-bootstrap";
import "../css/contactForm.css";

const ContactForm = () => {
  return (
    <Form>
      <h2>Send Us A Message</h2>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="email" placeholder="Full Name" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" placeholder="name@gmail.com" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label> MESSAGE</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <div className="button-content">
        <Button variant="secondary">SEND MESSAGE</Button>
      </div>
    </Form>
  );
};

export default ContactForm;
