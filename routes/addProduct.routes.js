const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const product = require('../mongodb/productSchema');
const category = require('../mongodb/categorySchema');
const subCategory = require('../mongodb/subCategorySchema');

router.post('/add-new-product', async (req,res) =>{
    let schema = Joi.object({
        name: Joi.string().required().min(3).max(150),
        image: Joi.string().required().min(3).max(150),
        description: Joi.string().required().min(3).max(250),
        price: Joi.number().required().min(3),
        offerPrice: Joi.number().required().min(3),
        isAvailable: Joi.boolean().required(),
        isTodayOffer: Joi.boolean().required()
    });
    let {error}= schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let cat = await category.categoryModel.find({}).select(['-subCat']);
    let subCat = await subCategory.subCatModel.find().select(["name"]); 
    let newProduct = await product.prodModel({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        offerPrice: req.body.offerPrice,
        isAvailable: req.body.isAvailable,
        isTodayOffer: req.body.isTodayOffer,
        category: cat,
        subCategory: subCat
    });
    await newProduct.save();
    res.send({msg: 'New product added successfully', data: newProduct});
});

module.exports = router;