import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from "react-router-dom";
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
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`/update/${id}`)
            .then(response => {
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
                setError(`Failed to fetch booking details. Error: ${err.message}`);
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
            time: `${date.getHours()}:${date.getMinutes()}`
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/update/' + id, formData)
        .then(result => {
            console.log(result);
            navigate('/admin/booking');
            setError("");
        })
        .catch(err => {
            console.error(err);
            setError(`Failed to update booking. Error: ${err.message}`);
        });
    };

    const joinDateTime = (date, time) => {
      console.log(new Date(date + ' ' + time).toISOString());
      return new Date(date + ' ' + time).toISOString();
    }

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
            <div>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </div>
        </Form>
      </div>
    );
}

export default UpdateBooking;
