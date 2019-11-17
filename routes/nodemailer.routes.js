const express = require('express');
const mailer = require('nodemailer');
const router = express.Router();
const crypto = require('crypto');
const register = require('../mongodb/userRegistration');
const Joi = require('@hapi/joi');

//API to request password change
router.post('/reset-request', async (req,res) =>{
    let schema = Joi.object({
        userLogin:{
            userEmail: Joi.string().required().min(9).max(150)
        }
    });
    let {error} = schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let checkMail = await register.userRegisterModel.findOne({"userLogin.userEmail": req.body.userLogin.userEmail});
    if(!checkMail){ return res.status(200).send({msg:'Email ID not found'});}
    let token = crypto.randomBytes(10).toString('hex');
    checkMail.resetPasswordToken=token; 
    checkMail.resetPasswordExpires = Date.now() + 3600000; //1 hour +
    await checkMail.save();
    res.send({mailCheck:'Please check your mail for further instructions'});

    let transporter = mailer.createTransport({
         host: 'smtp.ethereal.email',
         port: 587,
         auth: {
             user: 'kathleen.durgan72@ethereal.email',
             pass: 'zdSAMWPSxH6a5tDx6s'
         }
         
    });

    let mailOptions ={
        from: "OnlineCart",
        to: req.body.userLogin.userEmail,
        subject: 'Reset your password',
        text: 'Please click the following link to reset your password: localhost:4000/api/reset-password/' + token
    };
    transporter.sendMail(mailOptions, (err) =>{
        console.log(err.message);
    });

});

module.exports = router;