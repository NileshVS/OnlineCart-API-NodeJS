const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const category = require('../mongodb/subCategorySchema');

router.post('/add-new-subcategory', async (req,res) =>{
    let schema = Joi.object({
        name: Joi.string().required().min(2).max(150),
        catName: Joi.string().required()
    });
    let {error}= schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let newCategory = await category.subCatModel({
        name: req.body.name,
        catName: req.body.catName
    });
    await newCategory.save();
    res.send({msg: 'New sub category added successfully', data: newCategory});
});

module.exports = router;