// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom'; 
function Register() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="text" className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <p className="text-center mt-3">Already have an account? </p>
              <Link to="/login" className='btn btn-default border w-100 bg-light round-0 text-center'>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
