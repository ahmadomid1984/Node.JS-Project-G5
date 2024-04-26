const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
const cars = require("./models/Car");
const booking = require("./models/Booking");

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

console.log(dbURI);
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Listening on " + PORT));

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp@gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    app.post("/contact-us", async (req, res) => {
      const { name, email, message } = req.body;
      console.log("Received form data:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);

      // Send email using Nodemailer
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "New Form Submission",
          text: `
              Name: ${name}
              Email: ${email}
              Message: ${message}
            `,
        });

        console.log("Email sent successfully");
        res.send("Received form data");
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

//API to get car data
app.get("/cars", async (req, res) => {
  try {
    const result = await cars.find();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//API to post booking data
app.post("/booking", (req, res) => {
  booking
    .create(req.body)
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Admin page

app.get("/admin/booking", async (req, res) => {
  try {
    let result = await booking.aggregate([
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

    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// Delete the car data

app.delete("/booking/:id", (req, res) => {
  const id = req.params.id;
  booking
    .findByIdAndDelete({ _id: id })
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json("Error: " + err));
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
