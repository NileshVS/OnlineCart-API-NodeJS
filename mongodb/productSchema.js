const mongoose = require('mongoose');
const category = require('../mongodb/categorySchema');
const subCategory = require('../mongodb/subCategorySchema');

let prodSchema = new mongoose.Schema({
    name: {type:String, min: 3, required: true},
    image: {type:String, min: 3, required:true},
    description: {type: String, min:3, required: true},
    price: {type:Number, required:true},
    offerPrice: {type:Number, required:true},
    isAvailable: {type:Boolean,  required:true},
    isTodayOffer: {type:Boolean,  required:true},
    category: {type:String},
    subCategory: {type:String, required:true},
    isAdmin:{type:Boolean},
    recordDate: {type:Date, default: Date.now},
    updatedDate: {type: Date}
});

let prodModel = mongoose.model('product', prodSchema);

module.exports = {prodSchema,prodModel};