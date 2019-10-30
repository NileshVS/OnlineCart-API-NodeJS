const  express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const cart = require('../mongodb/cartSchema');
const user = require('../mongodb/userRegistration');
const product = require('../mongodb/productSchema');

router.post('/add-to-cart', async (req,res) => {

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

    try{
        
        // let userEml = await user.userRegisterModel.findById(req.body.cartDetails.usrId).select("userLogin.userPassword");

        // if(!userEml){
        //     return res.send('User ID does not exist!');
        // }

        let prod = await product.prodModel.findById(req.body.cartDetails.prodId);

        if(!prod){
            return res.send('Product ID does not exist!');
        }

        let newItem = await cart.cartModel({
            productId: req.body.cartDetails.prodId,
            name: prod.name,
            price: prod.price,
            quantity: req.body.cartDetails.quantity,
            totalPrice: (prod.price * req.body.cartDetails.quantity)
        })
    
        let result = await newItem.save();
        res.send({msg: 'Item added to cart', item: result});
    }
    catch(ex){
        res.send(ex.message);
    }
});
module.exports=router;