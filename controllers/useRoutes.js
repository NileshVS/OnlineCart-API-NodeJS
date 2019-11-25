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
const allSubCategory = require('../routes/allSubcategory.routes');
const findCatergory = require('../routes/findCategoryId.routes');
const deleteCategory = require('../routes/deleteCategoryId.routes');
const addProduct =require('../routes/addProduct.routes');
const updateProduct = require('../routes/updateProduct.routes');
const deleteProduct = require('../routes/removeProduct.routes');
const allProducts = require('../routes/allProducts.routes');
const productById = require('../routes/productById.routes');
const productPagination = require('../routes/prodcutPagination.routes');
const addSubCat = require('../routes/addSubCat.routes');
const addToCart = require('../routes/addToCart.routes');
const offerProducts = require('../routes/offerProduct.routes');
const latestProducts = require('../routes/latestProduct.routes');
const updateCart = require('../routes/updateCart.routes');
const cartByUsers = require('../routes/cartByUser.routes');
const allUserCart = require('../routes/allUserCart.routes');
const categoryPagination = require('../routes/categoryPagination.routes');
const subcategoryPagination = require('../routes/subcategoryPagination.routes');
const deleteSubcategory = require('../routes/deleteSubcategoryById.routes');
const deleteCartItem = require('../routes/deleteCart.routes');
module.exports = (app) => {
    app.use(express.json());
    app.use(morgan('tiny'));

    app.use('/api', [contact, userRegister, userLogin, resetReq, resetPass, allUsers, addCategory,
         allCategory, allSubCategory,findCatergory, deleteCategory, addProduct, updateProduct, deleteProduct, allProducts,
        productById, productPagination, addSubCat, addToCart, offerProducts, latestProducts, updateCart, cartByUsers,
        allUserCart, categoryPagination, subcategoryPagination, deleteSubcategory, deleteCartItem]);
}