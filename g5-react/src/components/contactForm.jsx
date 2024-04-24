import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

const ContactForm = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [MESSAGE, setMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit-form', {
        name: Name,
        email: Email,
        message: MESSAGE
      });
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Send Us A Message</h2>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Full Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Full Name" 
          value={Name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>E-mail</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="name@gmail.com" 
          value={Email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>MESSAGE</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={MESSAGE} 
          onChange={(e) => setMessage(e.target.value)} 
        />
      </Form.Group>
      <div className="button-content">
        <Button type= "submit" variant="secondary">SEND MESSAGE</Button> 
      </div>
    </Form>
  );
};

export default ContactForm;
