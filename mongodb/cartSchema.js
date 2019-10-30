const mongoose = require('mongoose');

let cartSchema = new mongoose.Schema({
    productId:{type:String,required:true},
    name: {type:String, required: true},
    // image: {type:String, min: 3, max:150, required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true},
    totalPrice: {type:Number, required:true},
    recordDate: {type:Date, default: Date.now},
    updatedDate: {type: Date}
});

let cartModel = mongoose.model('cart', cartSchema);

let userCartSchema = new mongoose.Schema({
    userEmail: {type: String, required: true},
    catItems: {type: cartSchema, required: true}
});

let userCartModel = mongoose.model('userCart', userCartSchema);

module.exports = {cartModel, userCartModel};