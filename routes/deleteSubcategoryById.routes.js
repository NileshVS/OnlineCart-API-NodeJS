const express = require('express');
const router = express.Router();
const subcategory = require('../mongodb/subCategorySchema');

router.delete('/delete-subcategory/:id', async (req,res) =>{
    let checkSubcategory = await subcategory.subCatModel.findByIdAndRemove(req.params.id);
    if(!checkSubcategory){ res.send('Please enter correct ID');}
    res.send({msg:'Following category deleted', deleted: checkSubcategory});
});

module.exports = router;