const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
const cars = require("./models/Car");


app.use(cors())
app.use(express.json())
  
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

  

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host : "smtp@gmail.com",
      port : 587,
      secure : false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    app.get("/products", async (req, res) => {
      try {
        const result = await Product.find();
        res.json(result);
      } catch (error) {
        console.log(error);
      }
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
          subject: 'New Form Submission',
          text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
          `,
        });
    
        console.log('Email sent successfully');
        res.send('Received form data');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    });
    
  })
  .catch((err) => {
    console.log(err);
  });

  app.get("/cars", async (req, res) => {
    try {
      const result = await cars.find();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  });