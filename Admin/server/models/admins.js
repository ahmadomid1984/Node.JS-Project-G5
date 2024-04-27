const mongoose = require('mongoose');
require("dotenv").config();

const adminsInfoSchema = new mongoose.Schema({
    firstName: String, 
    lastName : String, 
    phoneNumber : String,
    email : String, 
    password : String, 
    confirmPassword : String

})


const AdminsInfoModel = mongoose.model('AdminsInfo', adminsInfoSchema)

module.exports = AdminsInfoModel;