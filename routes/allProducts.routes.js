const express = require('express');
const router = express.Router();
const product = require('../mongodb/productSchema');

router.get('/all-product/', async (req,res) =>{
    let checkId = await product.prodModel.find();
    if(!checkId) { 
        return res.send('Something went wrong');
    }
    return res.send(checkId);
});

module.exports = router;