const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AdminsInfoModel = require("./models/admins");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


// MongoDB Atlas connection string
const dbURI =   "mongodb+srv://" +  process.env.DBUSERNAME + ":" + process.env.DBPASSWORD + "@" + process.env.CLUSTOR + ".mongodb.net/" + process.env.DB + "?retryWrites=true&w=majority&appName=Cluster0";

mongoose
.connect(dbURI)
.then(() => {
    console.log("MongoDB Atlas connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Server is running on port " + PORT));
})
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

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
