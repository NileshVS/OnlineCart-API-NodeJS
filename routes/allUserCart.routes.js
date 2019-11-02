const express = require('express');
const router = express.Router();
const cart = require('../mongodb/cartSchema');


router.get("/all-user-cart", async (req,res)=>{
    let data = await cart.cartModel.find();
    res.send({msg: 'Following is the all user cart data', data: data});
});

module.exports= router;