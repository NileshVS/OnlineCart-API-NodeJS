const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const contact = require('../mongodb/contacts');
const admin = require('../middleware/isAdminContacts');


//API to save new contacts
router.post('/new-contact', async (req,res) => {
    let {error} = joiValidation(req.body);
    if(error) { res.send(error.details[0].message)}
    let checkEmail = await contact.contactModel.findOne({email: req.body.email});
    if(checkEmail) {res.send('Email ID already exist');}
    let contactData=  contact.contactModel({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    let savedContact = await contactData.save();
    res.send({
        msg: 'New contact saved',
        saved: savedContact
    });
});

//APT to view contacts

router.get('/view-contact', admin, async (req,res) => {
    let jSchema = Joi.object({
        email: Joi.string().required().min(3).max(150)
    });
    let {error} = jSchema.validate(req.body);
    if(error) { return res.send(error.details[0].message);}
    let checkEmail = await contact.contactModel.findOne({ email: req.body.email});
    if(!checkEmail){ return res.send('Provided email does not exist')}
    else{
        let data = await contact.contactModel.find();
        return res.send({msg: 'Welcome admin', data: data});
    }
});

//Joi validation function
function joiValidation(para){
    let joiSchema = Joi.object({
        name: Joi.string().required().min(3).max(150),
        email: Joi.string().required().min(3).max(150),
        message: Joi.string().required().min(3).max(150)
    });

    return joiSchema.validate(para);
}

module.exports = router;