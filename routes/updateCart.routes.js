const express= require('express');
const router = express.Router();
const cart = require('../mongodb/cartSchema');
const product = require("../mongodb/productSchema");
const Joi = require('@hapi/joi');

router.put('/update-cart/:id', async(req,res) =>{

    try{
        let schema = Joi.object({
                quantity: Joi.number().required()
        });
    
        let {error} = schema.validate(req.body);
        if (error){
            return res.send(error.details[0].message);
        }

        let cartItem = await cart.cartModel.findById(req.params.id);
        if(!cartItem){
            return res.send({err1: 'Something went wrong!'});
        };
        // let prod = await product.prodModel.findById(req.params.id);
        // if(!prod){
        //     return res.send({err2: 'Product ID does not exist!'});
        // }

            cartItem.quantity = req.body.quantity;
            cartItem.totalPrice = cartItem.price * cartItem.quantity;
            
        let result = await cartItem.save();
    
        res.send({success: 'Product updated', details: result});
    }
    catch(ex){
        res.send(ex.message);
    }

});

module.exports = router;