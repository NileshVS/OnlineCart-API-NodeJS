const mongoose = require('mongoose');

let cartSchema = new mongoose.Schema({
    productId:{type:Number,required:true},
    name: {type:String, min: 3, max:350, required: true},
    image: {type:String, min: 3, max:150, required:true},
    price: {type:Number, min: 3, max:150, required:true},
    quantity: {type:Number, min: 3, max:150, required:true},
    totalPrice: {type:Number, required:true},
    recordDate: {type:Date, default: Date.now},
    updatedDate: {type: Date}
});

let cartModel = new mongoose.model('cart', cartSchema);

module.exports = {cartSchema, cartModel};