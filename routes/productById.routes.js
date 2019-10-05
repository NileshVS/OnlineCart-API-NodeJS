const express = require('express');
const router = express.Router();
const product = require('../mongodb/productSchema');

router.get('/all-product/:id', async (req,res) =>{
    let checkId = await product.prodModel.findById(req.params.id);
    if(!checkId) { 
        return res.send('Something went wrong');
    }
    return res.send({msg:'Following is the record ', data: checkId});
});

module.exports = router;