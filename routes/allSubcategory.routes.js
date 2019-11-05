const express = require('express');
const router = express.Router();
const subcategory = require('../mongodb/subCategorySchema');

router.get('/all-subcategory', async (req,res) =>{
    let allSubcategory = await subcategory.subCatModel.find();
    res.send(allSubcategory);
});

module.exports = router;