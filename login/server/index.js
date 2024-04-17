const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AdminsInfoModel = require("./models/admins")

const app = express();
app.use(express.json());
app.use(cors());

//mongodb://localhost:27017
mongoose.connect("mongodb://127.0.0.1:27017/Admins")


app.post('/adminsInfo', (req, res)=>
    {
        AdminsInfoModel.create(req.body)
        .then(AdminsInfo =>  res.json(AdminsInfo))
        .catch(err => res.status(400).json('Error:'+ err))
    })

app.listen(3001 , ()=>{
    console.log("Server is running on port 3001");
});