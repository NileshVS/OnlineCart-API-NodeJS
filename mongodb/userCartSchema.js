const mongoose = require('mongoose');
const cartSchema = require('./cartSchema');

let useCartSchema = new mongoose.Schema({
    userEmail:{type:String, min: 3, max:150, required:true},
    cartItem: {type: cartSchema, required: true}
});

let useCartModel = mongoose.model('useCart', useCartSchema);

module.exports = {useCartSchema, useCartModel};