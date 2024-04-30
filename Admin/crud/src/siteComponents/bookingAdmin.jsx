import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/booking.css";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/booking")
      .then(response => {
        console.log("Bookings fetched:", response.data);
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
      updateBookingUI(booking._id, response.data); // Update the UI here
    })
    .catch(error => {
      console.error('Error confirming booking:', error);
      alert('Error confirming booking.');
    });
  };
  
  function updateBookingUI(bookingId, bookingData) {
    // Update the state with the new booking data
    setBookings(currentBookings => currentBookings.map(b => {
      if (b._id === bookingId) {
        return { ...b, ...bookingData, isBooked: true }; // Merge updated data and mark as booked
      }
      return b;
    }));
  }
  
  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const convertToTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes;
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
