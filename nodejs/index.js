const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Product = require("./models/Product");  

app.use(cors())
app.use(express.json())

const dbURI =
  "mongodb+srv://" +  process.env.DBUSERNAME + ":" + process.env.DBPASSWORD + "@" + process.env.CLUSTOR + ".mongodb.net/" + process.env.DB + "?retryWrites=true&w=majority&appName=Cluster0";


  var database;

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


  app.get("/products", async (req, res) => {
    try {
      const result = await Product.find();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  });

  
