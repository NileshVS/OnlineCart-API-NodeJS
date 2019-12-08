const mongoose = require('mongoose');
const category = require('../mongodb/categorySchema');
const subCategory = require('../mongodb/subCategorySchema');

let imgSchema = new mongoose.Schema({
        imgUrl: {type: String},
        imgDest: {type:String}
});

let prodSchema = new mongoose.Schema({
    name: {type:String, min: 3, required: true},
    productImage: {type: String, required: true},
    description: {type: String, min:3, required: true},
    price: {type:Number, required:true},
    offerPrice: {type:Number, required:true},
    isAvailable: {type:Boolean,  required:true},
    isTodayOffer: {type:Boolean,  required:true},
    category: {type:String},
    subCategory: {type:String, required:true},
    isAdmin:{type:Boolean},
    recordDate: {type:Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now}
});

let imageModel = mongoose.model('images', imgSchema);

let prodModel = mongoose.model('product', prodSchema);

module.exports = {prodSchema,prodModel, imageModel, imgSchema};