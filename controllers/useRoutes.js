const express = require('express');
const morgan = require('morgan')
const contact = require('../routes/contact.routes');
const userRegister = require('../routes/userRegister.routes');

module.exports = (app) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/api', [contact, userRegister]);
}