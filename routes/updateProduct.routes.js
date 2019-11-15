const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const product = require('../mongodb/productSchema');

router.put('/update-product/:id', async (req,res) =>{
    let schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        offerPrice: Joi.number().required(),
        isAvailable: Joi.boolean().required(),
        isTodayOffer: Joi.boolean().required(),
        subCategory: Joi.string().required()
    });
    let {error}= schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let checkId = await product.prodModel.findById(req.params.id);
    if(!checkId) { 
        return res.send('Please enter correct ID');
    }
        checkId.name = req.body.name;
        checkId.description = req.body.description;
        checkId.price = req.body.price;
        checkId.offerPrice = req.body.offerPrice;
        checkId.isAvailable = req.body.isAvailable;
        checkId.isTodayOffer = req.body.isTodayOffer;
        checkId.subCategory = req.body.subCategory;
        checkId.updatedDate = Date.now();
        await checkId.save();
        res.send({msg: 'Product updated successfully', data: checkId});
    });

module.exports = router;