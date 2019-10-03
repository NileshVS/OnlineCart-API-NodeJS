const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

let userRegisterSchema = new mongoose.Schema({
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
    recordDate: {type:Date, default:Date.now},
    updateDate: {type:Date},
    avatar:{type:String}
});

userRegisterSchema.methods.userIdentity = function(){
    let token = jwt.sign({_id: this.id, isAdmin: this.isAdmin}, config.get('jwtKey'));
    return token;
};

let userRegisterModel = new mongoose.model('userRegister', userRegisterSchema);

module.exports = {userRegisterSchema, userRegisterModel};