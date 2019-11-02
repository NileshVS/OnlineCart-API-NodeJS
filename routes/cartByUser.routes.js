const  express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const userCart = require('../mongodb/userCartSchema');
const product = require('../mongodb/productSchema');
const user = require('../mongodb/userRegistration');

router.post('/usercart', async (req,res) => {

    let schema = Joi.object({
        cartDetails:{
            prodId: Joi.string().required(),
            userEmail: Joi.string().required(),
            quantity: Joi.number().required()
        }
    });

    let {error} = schema.validate(req.body);
    if (error){
        return res.send(error.details[0].message);
    }

    try{        
        let userEml = await user.userRegisterModel.findOne({'userLogin.userEmail': req.body.cartDetails.userEmail});

        if(!userEml){
            return res.send('User email does not exist!');
        }

        let prod = await product.prodModel.findById(req.body.cartDetails.prodId).select('-_id');
        // console.log(prod);
        if(!prod){
            return res.send('Product ID does not exist!');
        }

        let newItem = await userCart.userCartModel({
            userEmail: userEml.userLogin.userEmail,
            cartItem: prod
        })
    
        let result = await newItem.save();
        res.send({msg: `Item added to ${userEml.firstname}'s cart`, item: result});
    }
    catch(ex){
        res.send(ex.message);
    }
});
module.exports=router;