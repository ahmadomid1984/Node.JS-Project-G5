import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import '../css/map.css';

const Map = () => {
    return (
        <Row className="body-content">
            <Col xs={12} md={4} className="contact-info">
                <section aria-label="Contact Information">
                    <div className="contact-item">
                        <span className="txt1 p-b-20">Address</span>
                        <p>Vankanlähde 9, 13100 Hämeenlinna, Finland</p>
                    </div>
                    <div className="contact-item">
                        <span className="txt1 p-b-20">Work Hours</span>
                        <p>Mon-Fri 09:00 - 17:00</p>
                    </div>
                </section>
            </Col>
            <Col xs={12} md={8} className="map-and-address">
                <iframe
                    title="Google Map"
                    aria-label="Location map showing Vankanlähde 9, 13100 Hämeenlinna, Finland"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1935.7748836456192!2d24.480336200000004!3d60.9758187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468e5d7e9a7c3cb9%3A0x4755965d07c467ca!2sVankanl%C3%A4hde%209%2C%2013100%20H%C3%A4meenlinna!5e0!3m2!1sen!2sfi!4v1713629238779!5m2!1sen!2sfi"              
                    className="map-iframe"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </Col>
        </Row>
    );
};

export default Map;
