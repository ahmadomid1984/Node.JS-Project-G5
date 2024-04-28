import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/UpdateCar.css";

function UpdateCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    // General car attributes initialized with default values
    const [cars_id, setId] = useState("");
    const [car_name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [releasedDate, setDate] = useState("");
    const [price, setPrice] = useState(0);
    const [available_count, setCount] = useState(0);
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");

    // Features attributes initialized with default values
    const [bodyStyle, setBodyStyle] = useState("");
    const [carType, setCarType] = useState("");
    const [carColors, setCarColors] = useState("");
    const [fuel, setFuel] = useState("");
    const [gear, setGear] = useState("");
    const [totalSeats, setTotalSeats] = useState(0);
    const [engineCapacity, setEngineCapacity] = useState("");
    const [engine, setEngine] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`/api/getCar/${id}`)
            .then(response => {
                const data = response.data;
                setId(data.cars_id || "");
                setName(data.car_name || "");
                setBrand(data.brand || "");
                setDate(data.releasedDate || "");
                setPrice(data.price || 0);
                setCount(data.available_count || 0);
                setSummary(data.summary || "");
                setDescription(data.description || "");
                setBodyStyle(data.features.BodyStyle || "");
                setCarType(data.features.CarType || "");
                setCarColors(data.features.CarColors || "");
                setFuel(data.features.Fuel || "");
                setGear(data.features.Gear || "");
                setTotalSeats(data.features.TotalSeats || 0);
                setEngineCapacity(data.features.EngineCapacity || "");
                setEngine(data.features.Engine || "");
            })
            .catch(err => {
                console.error("Error fetching car details", err);
                setError(`Failed to fetch car details. Error: ${err.message}`);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/updateCar/${id}`, {
            cars_id, car_name, brand, releasedDate, price, available_count, summary, description,
            features: {
                BodyStyle: bodyStyle,
                CarType: carType,
                CarColors: carColors,
                Fuel: fuel,
                Gear: gear,
                TotalSeats: totalSeats,
                EngineCapacity: engineCapacity,
                Engine: engine
            }
        })
        .then(result => {
            console.log(result);
            navigate('/admin');
            setError("");
        })
        .catch(err => {
            console.error(err);
            setError(`Failed to update car. Error: ${err.message}`);
        });
    };

    return (
        <div className="update-car-container">
            <div className="update-car-content">
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">Update Car</h2>
                    <div className="form-container">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr><td>ID</td><td><input type="number" value={cars_id} onChange={e => setId(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Name</td><td><input type="text" value={car_name} onChange={e => setName(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Brand</td><td><input type="text" value={brand} onChange={e => setBrand(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Model</td><td><input type="text" value={releasedDate} onChange={e => setDate(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Price</td><td><input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} className="form-control"/></td></tr>
                                    <tr><td>Quantity</td><td><input type="number" value={available_count} onChange={e => setCount(parseInt(e.target.value))} className="form-control"/></td></tr>
                                    <tr><td>Summary</td><td><input type="text" value={summary} onChange={e => setSummary(e.target.value)} className="form-control"/></td></tr>
                                    <tr>
                                    <td>Description</td>
                                    <td>
                                        <textarea
                                            name="description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            className="description-form-control"
                                            rows="4"  // Adjust the number of rows as needed
                                            placeholder="Enter description here..."></textarea>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr><td>Body Style</td><td><input type="text" value={bodyStyle} onChange={e => setBodyStyle(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Car Type</td><td><input type="text" value={carType} onChange={e => setCarType(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Car Colors</td><td><input type="text" value={carColors} onChange={e => setCarColors(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Fuel</td><td><input type="text" value={fuel} onChange={e => setFuel(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Gear</td><td><input type="text" value={gear} onChange={e => setGear(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Total Seats</td><td><input type="number" value={totalSeats} onChange={e => setTotalSeats(parseInt(e.target.value))} className="form-control"/></td></tr>
                                    <tr><td>Engine Capacity</td><td><input type="text" value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)} className="form-control"/></td></tr>
                                    <tr><td>Engine</td><td><input type="text" value={engine} onChange={e => setEngine(e.target.value)} className="form-control"/></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="update-btn-container">
                        <button className="btn btn-success">Update</button>
                        <Link to="/admin" className="btn btn-secondary">Back to Cars List</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateCar;
