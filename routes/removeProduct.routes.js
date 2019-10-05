const express = require('express');
const router = express.Router();
const product = require('../mongodb/productSchema');

router.delete('/delete-product/:id', async (req,res) =>{
    let checkId = await product.prodModel.findByIdAndRemove(req.params.id);
    if(!checkId) { 
        return res.send('Please enter correct ID');
    }
    return res.send({msg:'Data deleted successfully', data: checkId});
});

module.exports = router;