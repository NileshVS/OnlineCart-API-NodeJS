const express = require('express');
const router = express.Router();
const product = require('../mongodb/productSchema');

router.get('/pagination/:page', async (req,res) => {
    let perPage = 10;
    let page =req.params.page || 1;
    let data = await product.prodModel.find({})
                                        .skip((perPage * page) - perPage)
                                        .limit(perPage);
    let totalProducts = await product.prodModel.find().count();
    let totalPages = Math.ceil(totalProducts/perPage);
    res.send({
        perPage: perPage,
        page:page,
        productData: data,
        totalProducts: totalProducts,
        totalPages: totalPages
    });
});

module.exports = router;