import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Form, Button } from "react-bootstrap";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="siteFooter footer">
      <Row>
        <Col className="footerContent text-left">
          <p>Footer content</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi.
          </p>
        </Col>
        <Col className="logo-container">
          <div className="icon">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </Col>
        <Col className="text-right">
          <Form.Label>SIGN UP FOR UPDATES</Form.Label>
          <div className="input-with-button">
            <Form.Control type="text" placeholder="Enter your email" />
            <Button variant="link">
              <img
                src="./images/send.png"
                alt="Button"
                className="sendIcon"
              />
            </Button>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
