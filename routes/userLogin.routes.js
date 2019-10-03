const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const userRegister = require('../mongodb/userRegistration');

router.get('/user-login', async (req,res) =>{
    let schema = Joi.object({
        userLogin:{
            userEmail: Joi.string().required().min(9).max(150),
            userPassword: Joi.string().required().min(3).max(150)
        }
    });
    let {error} = schema.validate(req.boy);
    if(error){ 
        res.send(error.details[0].message);
    }
    let checkEmail = await userRegister.userRegisterModel.findOne({"userLogin.userEmail": req.body.userLogin.userEmail });
    if(!checkEmail){
        return res.send('Invalid Credentials! Try again');
    }
    let checkPass = await bcrypt.compare( req.body.userLogin.userPassword, checkEmail.userLogin.userPassword);
    if(!checkPass){
        return res.send('Invalid Credentials! Try again');
    }
    else{
        let token = checkEmail.userIdentity();
        res.header('x-auth-token', token).send('Login Successfull');
        res.end();
    }
})

module.exports = router;