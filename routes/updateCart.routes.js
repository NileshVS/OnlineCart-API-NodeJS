const express= require('express');
const router = express.Router();
const cart = require('../mongodb/cartSchema');
const product = require("../mongodb/productSchema");
const Joi = require('@hapi/joi');

router.put('/update-cart/:id', async(req,res) =>{

    try{
        let schema = Joi.object({
            cartDetails:{
                prodId: Joi.string().required(),
                quantity: Joi.number().required()
            }
        });
    
        let {error} = schema.validate(req.body);
        if (error){
            return res.send(error.details[0].message);
        }

        let cartItem = await cart.cartModel.findById(req.params.id);
        if(!cartItem){
            return res.send('Something went wrong!');
        };
        let prod = await product.prodModel.findById(req.body.cartDetails.prodId);
        if(!prod){
            return res.send('Product ID does not exist!');
        }
            cartItem.productId = req.body.cartDetails.prodId;
            cartItem.name = prod.name;
            cartItem.price = prod.price;
            cartItem.quantity = req.body.cartDetails.quantity;
            cartItem.totalPrice = (prod.price * req.body.cartDetails.quantity);
        let result = await cartItem.save();
    
        res.send({msg: 'Product updated', details: result});
    }
    catch(ex){
        res.send(ex.message);
    }

});

module.exports = router;