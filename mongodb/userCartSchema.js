const mongoose = require('mongoose');
const cartSchema = require('./cartSchema');
let userCartSchema = new mongoose.Schema({
    userEmail:{type:String, min: 3, max:150, required:true},
    cartItem: {type: cartSchema.cartSchema, required: true}
});

let userCartModel = mongoose.model('userCart', userCartSchema);

module.exports = {userCartSchema, userCartModel};