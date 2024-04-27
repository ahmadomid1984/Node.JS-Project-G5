import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UpdateBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        car_id: '',
        name: '',
        email: '',
        phoneNumber: '',
        date: new Date(),
        time: ''
    });

    useEffect(() => {
        axios.get(`/update/${id}`)
            .then(response => {
                console.log("Booking details response:", response.data);
                const { car_id, name, email, phoneNumber, date, time } = response.data;
                setFormData({
                    car_id: car_id || "",
                    name: name || "",
                    email: email || "",
                    phoneNumber: phoneNumber || "",
                    date: date ? new Date(date) : new Date(),
                    time: time || ""
                });
            })
            .catch(err => {
                console.error("Error fetching booking details", err);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            date: date,
            time: `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/update/${id}`, formData)
        .then(result => {
            console.log(result);
            navigate('/admin/booking');
        })
        .catch(err => {
            console.error(err);
        });
    };

    const handleReturnButtonClick = () => {
        navigate('/admin/booking');
    };

    return (
        <div className='form-container'>
            <h2>Update Booking</h2>
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
                        selected={formData.date}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Button variant="secondary" onClick={handleReturnButtonClick}>
                Return to Booking
            </Button>
        </div>
    );
}

export default UpdateBooking;
