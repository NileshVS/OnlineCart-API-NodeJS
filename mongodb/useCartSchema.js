const mongoose = require('mongoose');

let useCartSchema = new mongoose.Schema({
    userEmail:{type:String, min: 3, max:150, required:true},
    cartItem: {type: mongoose.Schema.Types.ObjectId, ref:'cart'}
});

let useCartModel = new mongoose.model('useCart', useCartSchema);

module.exports = {useCartSchema, useCartModel};