const mongoose = require('mongoose');

let cartSchema = new mongoose.Schema({
    productId:{type:String},
    name: {type:String},
    productImage: {type:String},
    price: {type:Number},
    quantity: {type:Number},
    totalPrice: {type:Number},
    userEmail: {type:String},
    recordDate: {type:Date, default: Date.now},
    updatedDate: {type: Date}
});

let cartModel = mongoose.model('cart', cartSchema);

module.exports = {cartModel, cartSchema};