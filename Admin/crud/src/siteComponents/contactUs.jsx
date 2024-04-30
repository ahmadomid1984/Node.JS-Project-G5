import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "../css/contactUs.css";
import ContactForm from "./contactForm";

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <div className="top-text">
        <p className="text">Contact us with any question or inquiries or call 358-475-1111. 
        We would be happy to answer your questions and set up a meeting with you to have a best experience with us.</p>
      </div>
      <Container>
        <Row className="contact">
          <Col md={6} className="contact-container">
            <div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span class="txt1 p-b-20">Address</span>
                <p>Vankanlähde 9, 13100 Hämeenlinna, Finland</p>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} />
                <span class="txt1 p-b-20">Lets Talk</span>
                <p>+358 475-6789</p>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} />
                <span class="txt1 p-b-20">General support</span>
                <p>info@example.com</p>
              </div>
            </div>
          </Col>
          <Col md={6}>
            {" "}
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;