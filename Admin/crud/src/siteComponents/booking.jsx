import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import moment from 'moment-timezone';
import '../css/booking.css';

function Booking() {
    const location = useLocation();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [bookedTimes, setBookedTimes] = useState([]);

    const availableTimes = ["13:00", "14:00", "15:00"]; // Define your times in 24-hour format

    useEffect(() => {
        // Fetch booked times data from backend when component mounts
        fetchBookedTimes();
    }, []);

    const fetchBookedTimes = () => {
        // Fetch booked times from backend API
        fetch('/admin/booking')
            .then(response => response.json())
            .then(data => {
                const bookedTimes = data.map(booking => booking.date);
                setBookedTimes(bookedTimes);
            })
            .catch(error => {
                console.error('Error fetching booked times:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setSelectedTime(null); // Reset time selection on date change
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Combine the date and time into a full dateTime string
        const dateTime = moment(startDate).format('YYYY-MM-DD') + 'T' + selectedTime + ':00';
        
        // Convert and format for Helsinki time zone including the timezone offset in the format
        const helsinkiDate = moment.tz(dateTime, 'YYYY-MM-DDTHH:mm:ss', 'Europe/Helsinki').format('YYYY-MM-DDTHH:mm:ssZ');
        
        const submissionData = {
            ...formData,
            date: helsinkiDate, // Using the Helsinki date here
            car_id: location.state?.carId
        };

        fetch('/api/booking', {
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
            setSelectedTime(null); // Reset time
            fetchBookedTimes(); // Fetch updated booked times after successful booking
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
                        onChange={handleDateChange}
                        dateFormat="MMMM d, yyyy"
                    />
                    <div className="time-selector">
                        <label>Select a Time: </label>
                        <select onChange={handleTimeChange} value={selectedTime || ''} required>
                            <option value="">Select Time</option>
                            {availableTimes.map(time => (
                                <option key={time} value={time} disabled={bookedTimes.includes(moment(startDate).format('YYYY-MM-DD') + 'T' + time + ':00')}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button variant="primary" type="submit" disabled={!selectedTime}>
                    Submit
                </Button>
            </Form>
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
        </div>
    );
}

export default Booking;
