// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios.post('http://localhost:5000/login', { 
          email,
          password
        }).then(result => {console.log(result)
            if (result.data === "success") {
                navigate('/cars');
            }
        })
        .catch(err => console.log(err));
      }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit} >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)}/>
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
