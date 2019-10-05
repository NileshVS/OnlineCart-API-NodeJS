const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const category = require('../mongodb/categorySchema');

router.post('/add-new-category', async (req,res) =>{
    let schema = Joi.object({
        catName: Joi.string().required().min(3).max(150),
        subCat: Joi.string().required().min(3).max(150)
    });
    let {error}= schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let newCategory = await category.categoryModel({
        catName: req.body.catName,
        subCat: req.body.subCat
    });
    await newCategory.save();
    res.send({msg: 'New category added successfully', data: newCategory});
});

module.exports = router;