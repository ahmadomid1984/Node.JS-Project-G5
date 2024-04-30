import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/booking.css";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/booking")
      .then(response => {
        console.log("Bookings fetched:", response.data);  // Log the fetched data
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setBookings([]); // Set to empty array if not array to prevent errors
        }
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
        setBookings([]); // Ensure bookings is still an array on error
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete("/api/booking/" + id)
      .then(() => {
        const updatedBookings = bookings.filter((item) => item._id !== id);
        setBookings(updatedBookings);
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  const handleConfirmBooking = (booking) => {
    axios.post('/api/api/confirm-booking', {
      id: booking._id,
      formData: booking,
      isBooked: true
    })
    .then(response => {
      alert('Confirmation email sent!');
      console.log('Booking confirmed:', response.data);
      window.location.reload();
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
        <h1 className="dashboard-header">Bookings</h1>
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
                <button className="btn btn-primary ConfirmBtn" disabled={booking.isBooked} onClick={() => handleConfirmBooking(booking)}>
                  { booking.isBooked ? 'Appointment Booked' : 'Confirm Booking' }
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(booking._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Button to go back to the Admin Dashboard */}
        <div className="mt-4">
          <Link to="/admin" className="btn btn-secondary">
            Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminBooking;
