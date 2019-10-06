const mongoose = require('mongoose');

let subCatSchema = new mongoose.Schema({
    
    name:{type:String,required:true}
});

let subCatModel = mongoose.model('subCategory', subCatSchema);

module.exports = {subCatSchema,subCatModel};