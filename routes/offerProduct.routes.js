const express = require('express');
const router = express.Router();
const product = require('../mongodb/productSchema');

router.get('/offer-products', async (req,res)=>{
    let offerProducts = await product.prodModel.find({"isTodayOffer": "true"});
    res.send(offerProducts);
})

module.exports = router;