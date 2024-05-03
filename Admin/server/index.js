const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const CarModel = require("./models/Cars");
const AdminsInfoModel = require("./models/admins");
const booking = require("./models/Booking");
const moment = require('moment-timezone');
const nodemailer = require("nodemailer");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTOR}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Database connection error:", err));


// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access token is required');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
}


// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase

    // Find user by email
    AdminsInfoModel.findOne({ email: normalizedEmail })
        .then(user => {
            if (!user) {
                return res.status(404).send("User not found");
            }
            // Compare hashed password with password provided during login
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err); // Log error for debugging
                    return res.status(500).send("Server error");
                }
                if (!isMatch) {
                    return res.status(401).send("Wrong email or password");
                }
                // Generate and send JWT token if passwords match
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            });
        })
        .catch(err => {
            console.error(err); // Log error for debugging
            res.status(500).send("Server error");
        });
});


// Register route
app.post('/register', async (req, res) => {

    const { firstName, lastName, phoneNumber, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await AdminsInfoModel.create({
            firstName,
            lastName,
            phoneNumber,
            email: normalizedEmail, // Save normalized email to the database
            password: hashedPassword
        });


        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token:", token); // Log the token
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed. Please try again.');
    }
});

// Fetch all cars
app.get("/cars", (req, res) => {
    CarModel.find()  
    .then(cars => res.json(cars))
    .catch(err => res.status(400).send('Error: ' + err));
});

// Fetch a car by ID
app.get("/getCar/:id", (req, res) => {
    const id = req.params.id;
    CarModel.findById(id)
    .then(car => res.json(car))
    .catch(err => res.status(400).send('Error: ' + err));
});

// Update the car data
app.put("/updateCar/:id", authenticateToken,(req, res) => {
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

// Delete a car
app.delete("/deleteCar/:id", authenticateToken, (req, res) => {
    const id = req.params.id;
    CarModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(400).send('Error: ' + err));
});

// Create a new car
app.post("/CreateCar", authenticateToken, (req, res) => {
    CarModel.create(req.body)
    .then(car => res.json(car))
    .catch(err => res.status(400).send('Error: ' + err));
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
            from: email,
            to: process.env.EMAIL_USER,
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


// API to confirm a booking and send email with local time
app.post('/api/confirm-booking', async (req, res) => {
    const { formData, id, isBooked } = req.body;
    if (!formData || !formData.email) {
        console.error('Invalid input received');
        return res.status(400).send({ message: 'Invalid booking details provided.' });
    }

    try {
        booking
            .findByIdAndUpdate(
                { _id: id },
                {
                $set: {
                    car_id: formData.car_id,
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    date: formData.date,
                    time: formData.time,
                    isBooked: isBooked,
                },
                },
                { new: true }
            )
            .then(() => {})
            .catch((err) => res.status(400).json("Error: " + err));
    
// Working as inner join for car data from cars collection
    const bookingDetails = await booking.aggregate([
        {
        $lookup: {
            from: "cars",
            localField: "car_id",
            foreignField: "cars_id",
            as: "car",
        },
        },
        {
        $match: {
            car: { $ne: [] },
        },
        },
    ]);
    
    let updatedBookingDetails = bookingDetails.find(x => x._id == id);

    // Convert UTC date to Helsinki time before sending the email
    const formattedDate = moment.utc(updatedBookingDetails.date).tz("Europe/Helsinki").format("ddd MMM DD YYYY");
    const formattedTime = moment.utc(updatedBookingDetails.date).tz("Europe/Helsinki").format("HH:mm");

    await transporter.sendMail({
        from: process.env.EMAIL_USER, // This should match the authorized email
        to: formData.email,
        subject: `Booking confirmation at ${formattedDate} ${formattedTime}`,
        html: `
        <p>Hello ${updatedBookingDetails.name},</p>
    <p>Thank you for booking a test drive with us! Here are the details of your appointment:</p>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <p><strong>Time:</strong> ${formattedTime}</p>
    <p><strong>Car Model:</strong>${updatedBookingDetails.car[0].brand} ${updatedBookingDetails.car[0].car_name}</p> 
    <p>Please arrive 15 minutes early with your driver’s license and any other required documents. If you need to cancel your appointment, please contact us at +3584750000.</p>
    <p>We look forward to seeing you and hope you enjoy driving the ${updatedBookingDetails.car[0].brand} ${updatedBookingDetails.car[0].car_name}!</p>
    <p>Best regards,</p>
    <p>XYZ</p>
        `,
    });

    console.log("Email sent successfully");
    res.status(200).send({ message: "Confirmation email sent successfully!" });
    } catch (error) {
        console.error("Failed to send confirmation email:", error);
        res.status(500).send({ message: "Failed to send confirmation email." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));