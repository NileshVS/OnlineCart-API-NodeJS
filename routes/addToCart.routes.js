const  express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const cart = require('../mongodb/cartSchema');
const product = require('../mongodb/productSchema');
const auth = require('../middleware/authenticate');
const user = require('../mongodb/userRegistration');

router.post('/add-to-cart', auth,async (req,res) => {
    let checkLogin = await user.userRegisterModel.findById(req.decodedToken._id).select("userLogin.userEmail");
    console.log(checkLogin);
    if(!checkLogin){
        return res.send('Please login first!');
    } 
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
        
        let prod = await product.prodModel.findById(req.body.cartDetails.prodId);

        if(!prod){
            return res.send('Product ID does not exist!');
        }

        let newItem = await cart.cartModel({
            productId: req.body.cartDetails.prodId,
            name: prod.name,
            price: prod.price,
            quantity: req.body.cartDetails.quantity,
            totalPrice: (prod.price * req.body.cartDetails.quantity),
            userEmail: checkLogin.userLogin.userEmail
        })
    
        let result = await newItem.save();
        res.send({msg: 'Item added to cart', item: result});
    }
    catch(ex){
        res.send(ex.message);
    }
});
module.exports=router;