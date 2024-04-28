const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const CarModel = require("./models/Cars");
const AdminsInfoModel = require("./models/admins");
const booking = require("./models/Booking");
const moment = require('moment-timezone');
const nodemailer = require("nodemailer");

const app = express();

// Configure CORS to allow requests from the specific frontend URL
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const dbURI =
"mongodb+srv://" + process.env.DBUSERNAME + ":" + process.env.DBPASSWORD + 
"@" + process.env.CLUSTOR + ".mongodb.net/" + process.env.DB + 
"?retryWrites=true&w=majority&appName=Cluster0";

console.log(dbURI);
mongoose
    .connect(dbURI)
    .then((result) => {
        console.log("Connected to DB");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log("Listening on " + PORT));
    })
    .catch((err) => {
        console.log(err);
    });

// Use Mongoose to fetch all cars
app.get("/cars", (req, res) => {
    CarModel.find()  
    .then(cars => res.json(cars))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get the car data by ID in order to update 
app.get("/getCar/:id", (req, res) => {
    const id = req.params.id;
    CarModel.findById({_id:id}) 
    .then(car => res.json(car))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update the car data
app.put("/updateCar/:id", (req, res) => {
    const id = req.params.id;
    CarModel.findByIdAndUpdate(
        {_id: id}, 
        {$set: {
            cars_id: req.body.cars_id, 
            car_name: req.body.car_name, 
            brand: req.body.brand, 
            releasedDate: req.body.releasedDate, 
            price: req.body.price, 
            available_count: req.body.available_count, 
            summary: req.body.summary,
            description: req.body.description,
            features: req.body.features  // Make sure this matches your schema if features is a nested object
        }},
        { new: true }  // This option instructs Mongoose to return the updated version of the document.
    )
    .then(car => res.json(car))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete the car data
app.delete("/deleteCar/:id", (req, res) => {
    const id = req.params.id;
    CarModel.findByIdAndDelete({_id:id})
    .then(cars => res.json(cars))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Create a new car data
app.post("/CreateCar", (req, res) => {
    CarModel.create(req.body)
    .then(cars => res.json(cars))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Aryan Side
app.post('/register', (req, res) => {
    AdminsInfoModel.create(req.body)
        .then(AdminsInfo => res.json(AdminsInfo))
        .catch(err => res.status(400).json('Error:' + err));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    AdminsInfoModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("wrong password");
                }
            } else {
                res.json("user not found");
            }
        });
});

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



// Shreya Side

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

