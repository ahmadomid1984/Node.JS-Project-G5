import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateCar () {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cars_id, setId] = useState();
    const [car_name, setName] = useState();
    const [brand, setBrand] = useState();
    const [releasedDate, setDate] = useState();
    const [price, setPrice] = useState();
    const [available_count, setCount] = useState();
    const [summary, setSummary] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/getCar/`+id)
            .then(response => {
                const data = response.data;
                setId(data.cars_id);
                setName(data.car_name);
                setBrand(data.brand);
                setDate(data.releasedDate);
                setPrice(data.price);
                setCount(data.available_count);
                setSummary(data.summary);
            })
            .catch(err => {
                console.error("Error fetching car details", err);
                setError("Failed to fetch car details. Error: " + err.message);
            });
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/updateCar/`+id, {
            cars_id, car_name, brand, releasedDate, price, available_count, summary
        })
        .then(result => {
            console.log(result);
            navigate('/');
            setError(""); // Clear any previous errors on success
        })
        .catch(err => {
            console.error(err);
            setError("Failed to update car. Error: " + err.message); // Set the error message
        });
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update Car</h2>
                    <div className="mb-2">
                        <label>ID</label>
                        <input type="number" placeholder="Car ID" className="form-control"
                        value={cars_id} onChange={(e) => setId(Number(e.target.value))}/>
                    </div>
                    <div className="mb-2">
                        <label>Name</label>
                        <input type="text" placeholder="Car Name" className="form-control"
                        value={car_name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label>Brand</label>
                        <input type="text" placeholder="Brand" className="form-control"
                        value={brand} onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label>Model</label>
                        <input type="text" placeholder="Model" className="form-control"
                        value={releasedDate} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label>Price</label>
                        <input type="number" placeholder="Price" className="form-control"
                        value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>
                    </div>
                    <div className="mb-2">
                        <label>Quantity</label>
                        <input type="number" placeholder="Quantity" className="form-control"
                        value={available_count} onChange={(e) => setCount(parseInt(e.target.value))}/>
                    </div>
                    <div className="mb-2">
                        <label>Summary</label>
                        <input type="text" placeholder="Summary" className="form-control"
                        value={summary} onChange={(e) => setSummary(e.target.value)}/>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCar;
