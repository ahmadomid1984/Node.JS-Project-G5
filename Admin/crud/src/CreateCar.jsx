import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './css/CreateCar.css';  // Make sure your CSS path is correct

function CreateCar() {
    const [cars_id, setId] = useState("");
    const [car_name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [releasedDate, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [available_count, setCount] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [features, setFeatures] = useState({
        BodyStyle: "",
        CarType: "",
        CarColors: "",
        Fuel: "",
        Gear: "",
        TotalSeats: "",
        EngineCapacity: "",
        Engine: ""
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in features) {
            setFeatures(prev => ({ ...prev, [name]: value }));
        } else {
            switch (name) {
                case "cars_id": setId(value); break;
                case "car_name": setName(value); break;
                case "brand": setBrand(value); break;
                case "releasedDate": setDate(value); break;
                case "price": setPrice(value); break;
                case "available_count": setCount(value); break;
                case "summary": setSummary(value); break;
                case "description": setDescription(value); break;
                default: break;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const carData = { cars_id, car_name, brand, releasedDate, price, available_count, summary, description, features };
        axios.post("http://localhost:5000/CreateCar", carData)
            .then(result => {
                console.log(result);
                navigate('/');
                setError("");
            })
            .catch(err => {
                console.error(err);
                setError("Failed to create car. Error: " + err.message);
            });
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="wide-form-container bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2 className="addCar">Add Car</h2>
                    <div className="form-container">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr><td>ID</td><td><input type="number" name="cars_id" value={cars_id} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Name</td><td><input type="text" name="car_name" value={car_name} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Brand</td><td><input type="text" name="brand" value={brand} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Model</td><td><input type="text" name="releasedDate" value={releasedDate} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Price</td><td><input type="number" name="price" value={price} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Quantity</td><td><input type="number" name="available_count" value={available_count} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Summary</td><td><input type="text" name="summary" value={summary} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>
                                            <textarea 
                                            name="description" 
                                            value={description} 
                                            onChange={handleInputChange} 
                                            className="description-form-control"
                                            rows="4" 
                                            placeholder="Enter description here..."></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr><td>Body Style</td><td><input type="text" name="BodyStyle" value={features.BodyStyle} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Car Type</td><td><input type="text" name="CarType" value={features.CarType} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Car Colors</td><td><input type="text" name="CarColors" value={features.CarColors} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Fuel</td><td><input type="text" name="Fuel" value={features.Fuel} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Gear</td><td><input type="text" name="Gear" value={features.Gear} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Total Seats</td><td><input type="number" name="TotalSeats" value={features.TotalSeats} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Engine Capacity</td><td><input type="text" name="EngineCapacity" value={features.EngineCapacity} onChange={handleInputChange} className="form-control"/></td></tr>
                                    <tr><td>Engine</td><td><input type="text" name="Engine" value={features.Engine} onChange={handleInputChange} className="form-control"/></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="btn-container">
                        <button type="submit" className="btn btn-success">Submit</button>
                        <Link to="/" className="btn btn-secondary">Back to Cars List</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCar;
