const mongoose = require('mongoose');

let userRegistrationSchema = new mongoose.Schema({
    firstname: {type:String, required: true, min: 3, max: 150},
    lastname: {type:String, required: true, min: 3, max: 150},
    newsLetterCheck: {type:Boolean, required: true},
    userLogin:{
        userEmail: {type:String, required: true, min: 3, max: 150},
        userPassword: {type:String, required: true, min: 3, max: 150}
    },
    termsAcceptCheck: {type:Boolean, required: true},
    resetPasswordToken: {type:String},
    resetPasswordExpires: {type:Date},
    isAdmin: {type: Boolean},
    recordDate: {type:Date.now(), required: true},
    updateDate: {type:Date}
});