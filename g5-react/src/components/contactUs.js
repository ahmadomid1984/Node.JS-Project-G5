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
    <Container>
      <Row className="contact">
        <Col md={6} className="contact-container">
          <div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span class="txt1 p-b-20">Address</span>
              <p>Mada Center 8th floor, 379 Hudson St, New York, NY 10018 US</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} />
              <span class="txt1 p-b-20">Lets Talk</span>
              <p>+358 12 345 6789 </p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <span class="txt1 p-b-20">General support</span>
              <p>contact@example.com</p>
            </div>
          </div>
        </Col>
        <Col md={6}>
          {" "}
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
