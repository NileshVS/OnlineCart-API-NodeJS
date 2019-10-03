const express = require('express');
const router = express.Router();
const register = require('../mongodb/userRegistration');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

router.get('/reset-password/:token', async (req,res) =>{
    let schema = Joi.object({
        userLogin:{
            userPassword: Joi.string().required().min(3).max(150)
        }
    });
    let {error} = schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let newPass = req.body.userLogin.userPassword;
    let checkToken = await register.userRegisterModel.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}});
    if(!checkToken){return res.send('Invalid reset token, please place request again');}
    let passCheck = await bcrypt.compare(newPass, checkToken.userLogin.userPassword);
    if(passCheck){return res.send('Please do not use the same password');}
    let salt = await bcrypt.genSalt(10);
    let newEncryPass= await bcrypt.hash(newPass, salt)
    checkToken.userLogin.userPassword = newEncryPass;
    checkToken.updateDate = Date.now();
    await checkToken.save();
    return res.send('Password updated :)');
});

module.exports= router;