import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/booking.css"; // Assuming this is the correct path

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    fetch("/admin/booking")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    axios
      .delete("/booking/" + id)
      .then((response) => {
        const updateBooking = bookings.filter((item) => item._id !== id);
        setBookings(updateBooking);
      })
      .catch((err) => {
        console.error("Error: " + err); // Use console.error for errors
      });
  };

  const converToDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const converToTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
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
                <td>{converToDate(booking.date)}</td>
                <td>{converToTime(booking.date)}</td>
                <td className="actions">
                  <Link
                    to={`/update/${booking._id}`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(booking._id)}
                  >
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
