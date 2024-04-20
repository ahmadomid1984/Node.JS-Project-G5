import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="siteFooter footer">
      <Container fluid>
        <Row className="justify-content-between">
          <Col xs={12} md={6} className="footerContent">
            <div>
              <p className="company">About the company</p>
              <p className="companyContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="contact-info">
                <p className="contactUs">Contact Us:</p>
                <p className="phone">Phone: +358 475-6789</p>
                <p className="email">Email: info@example.com</p>
                <p className="workHours">Work Hours: Mon-Fri 09:00 - 17:00</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} className="map-and-address">
            <div className="address">
              <p className="addressWord">Address:</p>
              <p className="new-address">Vankanlähde 9, 13100 Hämeenlinna, Finland</p>
            </div>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1935.7748836456192!2d24.480336200000004!3d60.9758187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468e5d7e9a7c3cb9%3A0x4755965d07c467ca!2sVankanl%C3%A4hde%209%2C%2013100%20H%C3%A4meenlinna!5e0!3m2!1sen!2sfi!4v1713629238779!5m2!1sen!2sfi"              
              className="map-iframe"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Col>
        </Row>
        <Row className="icon-row justify-content-center">
          <Col xs={12}>
            <div className="icon">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
