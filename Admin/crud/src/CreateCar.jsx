import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCar () {
    const [cars_id, setId] = useState()
    const [car_name, setName] = useState()
    const [brand, setBrand] = useState()
    const [releasedDate, setDate] = useState()
    const [price, setPrice] = useState()
    const [available_count, setCount] = useState()
    const [summary, setSummary] = useState()
    
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/CreateCar", {cars_id, car_name, brand, releasedDate, price, available_count, summary})
        .then(result => {
            console.log(result);
            navigate('/')
            setError(""); // Clear any previous errors on success
        })
        .catch(err => {
            console.error(err);
            setError("Failed to create car. Error: " + err.message);  // Set the error message
        });
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add Car</h2>
                    <div className="mb-2">
                        <label htmlFor="">ID</label>
                        <input type="number" placeholder="Car ID" className="form-control"
                        onChange={(e) => setId(Number(e.target.value))}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Car Name" className="form-control"
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Brand</label>
                        <input type="text" placeholder="Brand" className="form-control"
                        onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Model</label>
                        <input type="text" placeholder="Model" className="form-control"
                        onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Price</label>
                        <input type="number" placeholder="Price" className="form-control"
                        onChange={(e) => setPrice(parseFloat(e.target.value))}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Quantity</label>
                        <input type="number" placeholder="Quantity" className="form-control"
                        onChange={(e) => setCount(parseInt(e.target.value))}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Summary</label>
                        <input type="text" placeholder="Summary" className="form-control"
                        onChange={(e) => setSummary(e.target.value)}/>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCar;