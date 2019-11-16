const express = require('express');
const router = express.Router();
const subcategory = require("../mongodb/subCategorySchema");

router.get('/subcategory-pagination', async (req,res) => {
    let perPage = 5;
    let data = await subcategory.subCatModel.find();
    let totalSubcategories = await subcategory.subCatModel.find().count();
    res.send({
        perPage: perPage,
        subcategoryData: data,
        totalSubcategories: totalSubcategories
    });
});

module.exports = router;