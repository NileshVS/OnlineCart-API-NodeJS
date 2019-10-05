const mongoose = require('mongoose');

let subCatSchema = new mongoose.Schema({
    name:{type:String, min: 3, max:150, required:true}
});

let subCatModel = new mongoose.model('subCategory', subCatSchema);

module.exports = {subCatSchema,subCatModel};