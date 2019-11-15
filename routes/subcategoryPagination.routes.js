const express = require('express');
const router = express.Router();
const subcategory = require("../mongodb/subCategorySchema");

router.get('/subcategory-pagination', async (req,res) => {
    let perPage = 5;
    let data = await subcategory.subCatModel.find();
    let totalSubcategories = await subcategory.subCatModel.find().count();
    let totalPages = Math.ceil(totalSubcategories/perPage);
    res.send({
        perPage: perPage,
        subcategoryData: data,
        totalsubCategories: totalSubcategories
    });
});

module.exports = router;