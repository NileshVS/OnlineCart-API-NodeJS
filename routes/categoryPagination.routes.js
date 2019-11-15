const express = require('express');
const router = express.Router();
const category = require("../mongodb/categorySchema");

router.get('/category-pagination', async (req,res) => {
    let perPage = 5;
    let data = await category.categoryModel.find();
    let totalCategories = await category.categoryModel.find().count();
    let totalPages = Math.ceil(totalCategories/perPage);
    res.send({
        perPage: perPage,
        categoryData: data,
        totalCategories: totalCategories,
        totalPages: totalPages
    });
});

module.exports = router;