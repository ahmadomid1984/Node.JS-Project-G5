import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/booking.css"; // Assuming this is the correct path

function AdminBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/admin/booking")
      .then(response => {
        console.log("Bookings fetched:", response.data);  // Log the fetched data
        setBookings(response.data);
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
      });
}, []);

  const handleDelete = (id) => {
    axios.delete("/booking/" + id)
      .then(() => {
        const updatedBookings = bookings.filter((item) => item._id !== id);
        setBookings(updatedBookings);
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  const handleConfirmBooking = (booking) => {
    axios.post('/api/confirm-booking', {
      id: booking._id,
      formData: booking
    })
    .then(response => {
      alert('Confirmation email sent!');
      console.log('Booking confirmed:', response.data);
    })
    .catch(error => {
      console.error('Error confirming booking:', error);
      alert('Error confirming booking.');
    });
  };

  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const convertToTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours(); // get hours directly in 24-hour format
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes; // pad single-digit minutes with a leading zero
    return hours + ":" + minutes; // return the time in 24-hour format
  };  

  return (
    <div className="d-flex vh-50 bg-primary justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-4">
        <h1 className="dashboard-header">Admin Dashboard</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.car[0].car_name}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phoneNumber}</td>
                <td>{convertToDate(booking.date)}</td>
                <td>{convertToTime(booking.date)}</td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleConfirmBooking(booking)}>
                    Confirm Booking
                  </button>
                  <Link to={`/update/${booking._id}`} className="btn btn-success">
                    Edit
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(booking._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBooking;
