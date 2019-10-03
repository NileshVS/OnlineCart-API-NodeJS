const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const userRegister = require('../mongodb/userRegistration');

//API to add new users

router.post('/new-user-register', async (req,res) => {
    let {error} = joiValidation(req.body);
    if(error){ res.send(error.details[0].message);}
    let checkEmailExits = await userRegister.userRegisterModel.findOne({"userLogin.userEmail": req.body.userLogin.userEmail});
    if(checkEmailExits){ res.send('User already exists');}
    else{
        let newUser = userRegister.userRegisterModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            newsLetterCheck: req.body.newsLetterCheck,
            userLogin: req.body.userLogin,
            termsAcceptCheck: req.body.termsAcceptCheck
        });
        let salt = await bcrypt.genSalt(10);
        newUser.userLogin.userPassword = await bcrypt.hash(newUser.userLogin.userPassword, salt);
        let savedUser = await newUser.save();
        res.send({
            msg: "Registration completed!",
            details: savedUser
        });
    }
    
});

//Joi validation function
function joiValidation(para){
    let joiSchema = Joi.object({
        firstname: Joi.string().required().min(3).max(150),
        lastname: Joi.string().required().min(3).max(150),
        newsLetterCheck: Joi.boolean().required(),
        userLogin: {
            userEmail: Joi.string().required().min(3).max(150),
            userPassword: Joi.string().required().min(3).max(150)
        },
        termsAcceptCheck: Joi.boolean().required()
    });

    return joiSchema.validate(para);
}

module.exports = router;