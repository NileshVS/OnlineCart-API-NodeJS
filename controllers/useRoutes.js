const express = require('express');
const morgan = require('morgan')
const contact = require('../routes/contact.routes');
const userRegister = require('../routes/userRegister.routes');
const userLogin = require('../routes/userLogin.routes');
const resetReq = require('../routes/nodemailer.routes');
const resetPass = require('../routes/resetPassword.routes');
const allUsers = require('../routes/allUsers.routes');

module.exports = (app) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/api', [contact, userRegister, userLogin, resetReq, resetPass, allUsers]);
}