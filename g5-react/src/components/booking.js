import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import '../css/booking.css';

function Booking() {
    const location = useLocation();
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedDate = startDate.toISOString();
        // const formattedTime = startDate.toTimeString().split(' ')[0];

        const submissionData = {
            ...formData,
            date: formattedDate,
            // time: formattedTime,
            car_id: location.state?.carId
        };

        fetch('/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionData)
        })
        .then(response => response.json())
        .then(data => {
            setShowModal(true);
            setStartDate(new Date()); // Reset date
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleClose = () => {
        setShowModal(false);
        window.location.href = '/'; 
    };

    return (
      <div className='form-container'>
        <h2>Booking</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="Enter full Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                    type="tel" 
                    name="phoneNumber" 
                    placeholder="Enter Phone number" 
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <div>
            <DatePicker
                selected={startDate}
                onChange={setStartDate}
                showTimeSelect
                dateFormat="Pp"
            />
            </div>
            <div>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your booking has been successfully made!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
        </div>
    );
}

export default Booking;
