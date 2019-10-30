const express = require('express');
const router = express.Router();
const product = require('../mongodb/productSchema');

router.get('/latest-products', async (req,res)=>{
    let products = await product.prodModel.find().sort("-recordDate").limit(5);
    res.send(products);
})

module.exports = router;