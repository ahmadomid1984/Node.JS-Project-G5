const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AdminsInfoModel = require("./models/admins");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const DB_USERNAME = process.env.DBUSERNAME;
const DB_PASSWORD = process.env.DBPASSWORD;
const CLUSTER = process.env.CLUSTER;
const DB_NAME = process.env.DB;

// MongoDB Atlas connection string
const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas connected'))
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

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
