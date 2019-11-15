const mongoose = require('mongoose');
const subcat = require('../mongodb/subCategorySchema');

let categorySchema = new mongoose.Schema({
    catName:{type:String, min: 3, max:150, required:true}
});

let categoryModel = mongoose.model('category', categorySchema);

module.exports = {categorySchema,categoryModel};