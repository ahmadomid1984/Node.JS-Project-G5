import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './css/Features.css'; // Ensure the path is correct

function Features() {
    const { id } = useParams();
    const [car, setCar] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/getCar/`+id)
            .then(response => {
                setCar(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch car features', error);
            });
    }, [id]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h1 className="dashboard-header">Car Features for {car.car_name}</h1>
                {car.features && (
                    <table className="features-table">
                        <tbody>
                            <tr className='headingTab'><th>Features</th><th>Details</th></tr>
                            <tr><td className='firstTab'>Body Style</td><td>{car.features.BodyStyle}</td></tr>
                            <tr><td className='firstTab'>Car Type</td><td>{car.features.CarType}</td></tr>
                            <tr><td className='firstTab'>Car Colors</td><td>{car.features.CarColors}</td></tr>
                            <tr><td className='firstTab'>Fuel</td><td>{car.features.Fuel}</td></tr>
                            <tr><td className='firstTab'>Gear</td><td>{car.features.Gear}</td></tr>
                            <tr><td className='firstTab'>Total Seats</td><td>{car.features.TotalSeats}</td></tr>
                            <tr><td className='firstTab'>Engine Capacity</td><td>{car.features.EngineCapacity}</td></tr>
                            <tr><td className='firstTab'>Engine</td><td>{car.features.Engine}</td></tr>
                        </tbody>
                    </table>
                )}
                <Link to="/cars" className="link">Back to Cars List</Link>
            </div>
        </div>
    );
}

export default Features;
