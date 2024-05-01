import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

function AdminDashboard() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('/api/cars');
                setCars(response.data);
            } catch (error) {
                console.error('Failed to fetch cars', error);
            }
        };

        fetchCars();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/deleteCar/` + id)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(err => {
                console.error('Error:', err);
            });
    };

    const handleLogout = () => {
        // Assuming you're using local storage to manage the login state
        localStorage.clear();  // This will clear all local storage, ensuring no lingering data

        // Navigate to login and replace history
        navigate('/login', { replace: true });

        // Optional: Force a full reload from the server to ensure all session data is cleared
        window.location.href = '/login';
    };

    return (
        <div className="d-flex vh-50 bg-primary justify-content-center align-items-center">
            <div className="w-80 bg-white rounded p-4">
                <h1 className="dashboard-header">Admin Dashboard</h1>
                <div className="mb-2">
                    <Link to="/admin/create" className="btn btn-success me-2">Add +</Link>
                    <Link to="/admin/bookings" className="btn btn-warning">Bookings</Link>
                    <button onClick={handleLogout} className="btn btn-secondary ms-2">Logout</button>
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
