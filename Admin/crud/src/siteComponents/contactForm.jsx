import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 
  const [statusMessage, setStatusMessage] = useState(''); // For success or error messages
  const [isError, setIsError] = useState(false); // To toggle between success and error states

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact-us', {
        name,
        email,
        message
      });
      setStatusMessage('Your message has been sent successfully!');
      setIsError(false);
      // Optionally clear the form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting form data:', error);
      setStatusMessage('Failed to send message. Please try again.');
      setIsError(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="contactForm">
      <h2>Send Us A Message</h2>
      {statusMessage && (
        <Alert variant={isError ? "danger" : "success"}>
          {statusMessage}
        </Alert>
      )}
      <Form.Group controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="name@example.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="formBasicMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
      </Form.Group>
      <div className="button-content">
        <Button type="submit" variant="secondary">Send Message</Button>
      </div>
    </Form>
  );
};

export default ContactForm;
