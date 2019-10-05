const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    catName:{type:String, min: 3, max:150, required:true},
    subCat: {type:String, min: 3, max:150, required: true}
});

let categoryModel = new mongoose.model('category', categorySchema);

module.exports = {categorySchema,categoryModel};