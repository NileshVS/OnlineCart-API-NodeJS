const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const multer = require('multer');
const product = require('../mongodb/productSchema');
// const category = require('../mongodb/categorySchema');
const subCategory = require('../mongodb/subCategorySchema');
let imgPort = 'http://localhost:4000';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({
    storage: storage,
     limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.post('/add-new-product', upload.single('image') ,async (req,res) =>{
    let schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        offerPrice: Joi.number().required(),
        isAvailable: Joi.boolean().required(),
        isTodayOffer: Joi.boolean().required(),
        subCategory: Joi.string().required()
    });
    let {error}= schema.validate(req.body);
    if(error){ return res.send(error.details[0].message);}
    let cat = await subCategory.subCatModel.findOne({name: req.body.subCategory}).select("catName");
    // console.log(cat);
    // let subCat = await subCategory.subCatModel.find().select(["name"]); 
    let newProduct = await product.prodModel({
        name: req.body.name,
        image: imgPort+ '/uploads/' + req.file.filename,
        description: req.body.description,
        price: req.body.price,
        offerPrice: req.body.offerPrice,
        isAvailable: req.body.isAvailable,
        isTodayOffer: req.body.isTodayOffer,
        category: cat,
        subCategory: req.body.subCategory
    });
    await newProduct.save();
    res.send({msg: 'New product added successfully', data: newProduct});
});

module.exports = router;