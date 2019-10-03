const mongoose = require('mongoose');

let contactSchema = new mongoose.Schema({
    name: {type:String, required: true, min: 3, max: 150},
    email: {type: String, required:true, min: 3, max:150},
    message: {type: String, required:true, min: 3, max:150}
});

let contactModel = new mongoose.model('contacts', contactModel);

module.exports = {contactModel,contactSchema};