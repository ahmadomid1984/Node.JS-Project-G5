import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

function AdminDashboard() {
    const [cars, setCars] = useState([]);  // Start with an empty array
    const navigate = useNavigate();  // Hook for programmatically navigating

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('/api/cars');
                setCars(response.data);  // Set the cars state to the fetched data
            } catch (error) {
                console.error('Failed to fetch cars', error);
            }
        };

        fetchCars();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/deleteCar/` + id)
        .then(response => {
            console.log(response.data); // Log the response data from the server
            window.location.reload();  // Reload the page to update the list
        })
        .catch(err => {
            console.error('Error: ' + err); // Use console.error for errors
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');  // Clearing user token
        navigate('/login', { replace: true });  // Navigate to login and replace history
    };

    return (
        <div className="d-flex vh-50 bg-primary justify-content-center align-items-center">
            <div className="w-80 bg-white rounded p-4">
                <h1 className="dashboard-header">Admin Dashboard</h1>
                <div className="mb-2">
                    <Link to="/admin/create" className="btn btn-success me-2">Add +</Link>
                    <Link to="/admin/bookings" className="btn btn-info">Bookings</Link>
                    <button onClick={handleLogout} className="btn btn-primary ms-2">Logout</button> {/* Logout Button */}
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Car Name</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Summary</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car, index) => (
                            <tr key={index}>
                                <td>{car.cars_id}</td>
                                <td>{car.car_name}</td>
                                <td>{car.brand}</td>
                                <td>{car.releasedDate}</td>
                                <td>{car.price}</td>
                                <td>{car.available_count}</td>
                                <td className="summary">{car.summary}</td>
                                <td>{car.description}</td>
                                <td className="actions">
                                    <Link to={`/admin/features/${car._id}`} className="btn btn-info me-1">Features</Link>
                                    <Link to={`/admin/update/${car._id}`} className="btn btn-success me-1">Edit</Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(car._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
