const mongoose = require('mongoose');
const contact = require('../mongodb/contacts');

async function isAdmin(req,res,next){
    let checkAdmin = await contact.contactModel.findOne({email: req.body.email});
    if(!checkAdmin){ return res.send('Email not found');}
    if(checkAdmin.name == 'admin'){
        return next();
    }
    else{
         return res.status(402).send('Admin login required');
    }
}

module.exports= isAdmin;