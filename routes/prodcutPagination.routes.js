const express = require('express');
const router = express.Router();
const product = require('../mongodb/productSchema');

router.get('/pagination', async (req,res) => {
    let perPage = 10;
    let data = await product.prodModel.find().sort("-recordDate");
    let totalProducts = await product.prodModel.find().count();
    let totalPages = Math.ceil(totalProducts/perPage);
    res.send({
        perPage: perPage,
        productData: data,
        totalProducts: totalProducts,
        totalPages: totalPages
    });
});

module.exports = router;