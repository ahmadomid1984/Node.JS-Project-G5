const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AdminsInfoModel = require("./models/admins")

const app = express();
app.use(express.json());
app.use(cors());

//mongodb://localhost:27017
mongoose.connect("mongodb://127.0.0.1:27017/Admins")


app.post('/register', (req, res)=>
    {
        AdminsInfoModel.create(req.body)
        .then(AdminsInfo =>  res.json(AdminsInfo))
        .catch(err => res.status(400).json('Error:'+ err))
    })

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    AdminsInfoModel.findOne({email : email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("success");
            }else{
                res.json("wrong password");
            }
        }else{
            res.json("user not found");
        }
    })
})
app.listen(3001 , ()=>{
    console.log("Server is running on port 3001");
});