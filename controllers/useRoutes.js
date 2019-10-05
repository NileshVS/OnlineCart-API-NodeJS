const express = require('express');
const morgan = require('morgan')
const contact = require('../routes/contact.routes');
const userRegister = require('../routes/userRegister.routes');
const userLogin = require('../routes/userLogin.routes');
const resetReq = require('../routes/nodemailer.routes');
const resetPass = require('../routes/resetPassword.routes');
const allUsers = require('../routes/allUsers.routes');
const addCategory = require('../routes/addCategory.routes');
const allCategory = require('../routes/allCategory.routes');
const findCatergory = require('../routes/findCategoryId.routes');
const deleteCategory = require('../routes/deleteCategoryId.routes');
const addProduct =require('../routes/addProduct.routes');
const updateProduct = require('../routes/updateProduct.routes');
const deleteProduct = require('../routes/removeProduct.routes');
const allProducts = require('../routes/allProducts.routes');

module.exports = (app) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/api', [contact, userRegister, userLogin, resetReq, resetPass, allUsers, addCategory,
         allCategory,findCatergory, deleteCategory, addProduct, updateProduct, deleteProduct, allProducts]);
}