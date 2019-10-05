const express = require('express');
const router = express.Router();
const category = require('../mongodb/categorySchema');

router.get('/all-category', async (req,res) =>{
    let allCategory = await category.categoryModel.find();
    res.send(allCategory);
});

module.exports = router;