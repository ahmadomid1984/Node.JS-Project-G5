import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useAuth } from '../context/AuthContext';  // Adjust the path as necessary

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Here we make the post request to your API
        axios.post('/api/login', { 
            email, 
            password 
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.data === "success") {
                login(response.data.token, { email }); // Assuming your API returns a token
                navigate('/admin');
            } else {
                alert("Wrong email or password");
            }
        }).catch(error => {
            console.error("Error during login:", error);
            alert("Network error or server not responding");
        });
    };

    return (
        <div className="loginContainer">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            <p className="text-center mt-3">Do not have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
