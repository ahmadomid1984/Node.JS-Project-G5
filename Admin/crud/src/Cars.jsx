import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './css/Cars.css';


function Cars () {
    const [cars, setCars] = useState([]);  // Start with an empty array

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("http://localhost:5000"); 
                setCars(response.data);  // Set the cars state to the fetched data
            } catch (error) {
                console.error('Failed to fetch cars', error);
            }
        };

        fetchCars();
    }, []);  // The empty array ensures this effect runs only once when the component mounts

    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/deleteCar/`+id)
        .then(response => {
            console.log(response.data) // Log the response data from the server
            window.location.reload()
        })
        .catch(err => {
            console.error('Error: ' + err); // Use console.error for errors
        });
    }
    
    return (
        <div className="d-flex vh-50 bg-primary justify-content-center align-items-center">
            <div className="w-80 bg-white rounded p-4">
                <h1 className="dashboard-header">Admin Dashboard</h1>
                <Link to="/create" className="btn btn-success">Add +</Link>
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
                                    <Link to={`/features/${car._id}`} className="btn btn-info">Features</Link>
                                    <Link to={`/update/${car._id}`} className="btn btn-success">Edit</Link>
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

export default Cars;
