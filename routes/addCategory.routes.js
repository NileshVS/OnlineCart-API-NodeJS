const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const category = require('../mongodb/categorySchema');
const subCat = require('../mongodb/subCategorySchema');


router.post('/add-new-category', async (req,res) =>{
    try {
    let schema = Joi.object({
        catName: Joi.string().required().min(3).max(150)
    });
    let {error}= schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let subcatM = await subCat.subCatModel.find().select("name");
    // if(!subcatM) {return res.status(404).send('invalid subcategory id')}
    let newCategory = await category.categoryModel({
        catName: req.body.catName,
        subCat:subcatM
    });
    await newCategory.save();
    res.send({msg: 'New category added successfully', data: newCategory});
}
catch(ex) {
    res.send(ex.message);
}
});

module.exports = router;