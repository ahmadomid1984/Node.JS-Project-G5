// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import "../css/register.css";

function Register() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState(); 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState(); 
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Notify user that passwords do not match
      alert("Passwords do not match");
      return;
    }
    axios.post('/api/register', {
      firstName, 
      lastName, 
      phoneNumber, 
      email, 
      password, 
      confirmPassword
    })
    .then(result => {
      console.log(result);
      alert("Registration successful. You are now registered!");
      navigate('/login');
    })
    .catch(err => {
      console.error(err);
      // Notify user about the registration error
      alert("Registration failed. Please try again.");
    });
  }
  return (  
    <div className="registerContainer">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label"><strong>First Name</strong></label>
                  <input type="text" placeholder=" Enter your First Name" className="form-control" id="firstName" onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label"><strong>Last Name</strong></label>
                  <input type="text" placeholder=" Enter your Last Name" className="form-control" id="lastName" onChange={(e)=>setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label"><strong>Phone Number</strong></label>
                  <input type="text" placeholder=" Enter your Phone Number" className="form-control" id="phone" onChange={(e)=>setPhoneNumber(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                  <input type="email" placeholder=" Enter your Email address Like : Name@domain " className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                  <input type="password"  className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label"><strong>Confirm Password</strong></label>
                  <input type="password"  className="form-control" id="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-info w-100">Register</button>
              </form>
              <p className="text-center mt-3">Already have an account? </p>
              <Link to="/login" className='btn btn-success w-100'>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
