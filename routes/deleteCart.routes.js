const express= require('express');
const router = express.Router();
const cart = require('../mongodb/cartSchema');

router.delete('/delete-cart/:id', async(req,res) =>{

    try{

        let deleteCartItem = await cart.cartModel.findByIdAndRemove(req.params.id);
        if(!deleteCartItem){
            return res.send({err1: 'Something went wrong!'});
        };
    
        res.send({success: 'Product deleted'});
    }
    catch(ex){
        res.send(ex.message);
    }

});

module.exports = router;