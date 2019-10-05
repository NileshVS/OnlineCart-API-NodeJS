const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const product = require('../mongodb/productSchema');

router.put('/update-product/:id', async (req,res) =>{
    let schema = Joi.object({
        name: Joi.string().required().min(3).max(150),
        image: Joi.string().required().min(3).max(150),
        description: Joi.string().required().min(3).max(250),
        price: Joi.number().required().min(3),
        offerPrice: Joi.number().required().min(3),
        isAvailable: Joi.boolean().required(),
        isTodayOffer: Joi.boolean().required(),
        category: Joi.string().required().min(3).max(150),
        subCategory: Joi.string().required().min(3).max(150)
    });
    let {error}= schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let checkId = await product.prodModel.findById(req.params.id);
    if(!checkId) { 
        return res.send('Please enter correct ID');
    }
        checkId.name = req.body.name;
        checkId.image = req.body.image;
        checkId.description = req.body.description;
        checkId.price = req.body.price;
        checkId.offerPrice = req.body.offerPrice;
        checkId.isAvailable = req.body.isAvailable;
        checkId.isTodayOffer = req.body.isTodayOffer;
        checkId.category = req.body.category;
        checkId.subCategory = req.body.subCategory;
        checkId.updatedDate = Date.now();
        await checkId.save();
        res.send({msg: 'Product updated successfully', data: checkId});
    });

module.exports = router;