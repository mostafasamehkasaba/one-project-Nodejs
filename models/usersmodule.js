const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utiles/roles');
const userSchema = new mongoose.Schema({
    fristName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'field must be a valid email address']
    },

    password: {
        type: String,
        required: true
    },
    token: {
        type :String,
        required : true
    },
    role :{
        type : String,
        enum : [userRoles.USER,userRoles.ADMIN,userRoles.MANGER],
        default : userRoles.USER
    },
    avater :{
        type: String,
         dafault : 'uploads/profile.jpg'
    }
});

module.exports = mongoose.model('User', userSchema);