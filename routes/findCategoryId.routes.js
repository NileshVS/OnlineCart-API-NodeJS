const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const category = require('../mongodb/categorySchema');

router.get('/find-category/:id', async (req,res) =>{
    let checkCategory = await category.categoryModel.findById(req.params.id);
    if(!checkCategory){ res.send('Please enter correct ID');}
    res.send(checkCategory);
});

module.exports = router;