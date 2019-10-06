const mongoose = require('mongoose');
const category = require('../mongodb/categorySchema');
const subCategory = require('../mongodb/subCategorySchema');

let prodSchema = new mongoose.Schema({
    name: {type:String, min: 3, max:150, required: true},
    image: {type:String, min: 3, max:350, required:true},
    description: {type: String, min:3, max: 150, required: true},
    price: {type:Number, min: 3, required:true},
    offerPrice: {type:Number, min: 3, required:true},
    isAvailable: {type:Boolean,  required:true},
    isTodayOffer: {type:Boolean,  required:true},
    category: [category.categorySchema],
    subCategory: [subCategory.subCatSchema],
    isAdmin:{type:Boolean},
    recordDate: {type:Date, default: Date.now},
    updatedDate: {type: Date}
});

let prodModel = new mongoose.model('product', prodSchema);

module.exports = {prodSchema,prodModel};