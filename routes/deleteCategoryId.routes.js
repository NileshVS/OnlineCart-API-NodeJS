const express = require('express');
const router = express.Router();
const category = require('../mongodb/categorySchema');

router.delete('/delete-category/:id', async (req,res) =>{
    let checkCategory = await category.categoryModel.findByIdAndRemove(req.params.id);
    if(!checkCategory){ res.send('Please enter correct ID');}
    res.send({msg:'Following category deleted', deleted: checkCategory});
});

module.exports = router;