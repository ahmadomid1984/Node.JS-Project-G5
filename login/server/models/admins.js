const mongoose = require('mongoose');

const adminsInfoSchema = new mongoose.Schema({
    firstName: String, 
    lastName : String, 
    phoneNumber : String, 
    password : String, 
    confirmPassword : String

})


const AdminsInfoModel = mongoose.model('AdminsInfo', adminsInfoSchema)

module.exports = AdminsInfoModel;