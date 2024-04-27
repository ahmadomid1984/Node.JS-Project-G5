const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
const cars = require("./models/Car");
const booking = require("./models/Booking");
const moment = require('moment-timezone');


app.use(cors());
app.use(express.json());

const dbURI =
    "mongodb+srv://" +
    process.env.DBUSERNAME +
    ":" +
    process.env.DBPASSWORD +
    "@" +
    process.env.CLUSTOR +
    ".mongodb.net/" +
    process.env.DB +
    "?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API to send a contact us form email
app.post("/contact-us", async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "New Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });
        console.log("Email sent successfully");
        res.send("Received form data");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});

// API to retrieve all cars
app.get("/cars", async (req, res) => {
    try {
        const result = await cars.find();
        res.json(result);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).send("Error fetching cars");
    }
});

// API to create a new booking
app.post("/booking", async (req, res) => {
    try {
        const newBooking = await booking.create(req.body);
        res.json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(400).send("Error: " + error);
    }
});

// API to retrieve all bookings for admin
app.get("/admin/booking", async (req, res) => {
    try {
        const result = await booking.aggregate([
            { $lookup: {
                from: "cars",
                localField: "car_id",
                foreignField: "cars_id",
                as: "car"
            }},
            { $match: {
                car: { $ne: [] }
            }}
        ]);
        res.json(result);
    } catch (error) {
        console.error("Error fetching bookings for admin:", error);
        res.status(500).send("Error fetching bookings");
    }
});

// API to delete a booking
app.delete("/booking/:id", async (req, res) => {
    try {
        const result = await booking.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(400).json("Error: " + error);
    }
});

app.get("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await booking.findById(id);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

// Update  data
app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    booking
        .findByIdAndUpdate(
        { _id: id },
        {
            $set: {
            car_id: req.body.car_id,
            name: req.body.name,
            emial: req.body.email,
            phoneNumber: req.body.phoneNumber,
            date: req.body.date,
            time: req.body.time,
            },
        },
      { new: true } // This option instructs Mongoose to return the updated version of the document.
    )
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post('/api/confirm-booking', async (req, res) => {
    const { formData } = req.body;
    if (!formData || !formData.email) {
        console.error('Invalid input received');
        return res.status(400).send({ message: 'Invalid booking details provided.' });
    }

    try {
        // Convert UTC date to Helsinki time before sending the email
        const helsinkiTime = moment.utc(formData.date).tz("Europe/Helsinki").format('YYYY-MM-DDTHH:mm:ssZ');

        await transporter.sendMail({
            from: process.env.EMAIL_USER, // This should match the authorized email
            to: formData.email,
            subject: 'Booking Confirmation',
            text: `Your booking for ${helsinkiTime} has been confirmed!`
        });

        console.log('Email sent successfully');
        res.status(200).send({ message: 'Confirmation email sent successfully!' });
    } catch (error) {
        console.error('Failed to send confirmation email:', error);
        res.status(500).send({ message: 'Failed to send confirmation email.' });
    }
});
