const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const multer = require('multer');
const product = require('../mongodb/productSchema');
const path = require('path');
// const category = require('../mongodb/categorySchema');
const subCategory = require('../mongodb/subCategorySchema');
let imgPort = 'http://localhost:4000';
let pathDir = path.join(__dirname, '../uploads')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathDir);
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


router.post('/add-new-product', async (req,res) =>{
    // console.log(req.file);
    let schema = Joi.object({
        name: Joi.string().required(),
        productImage: Joi.string().required(),
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
    console.log(cat);
    // let subCat = await subCategory.subCatModel.find().select(["name"]); 
	let img = await product.imageModel.findOne({_id: req.body.imageID});
    let newProduct = await product.prodModel({
        name: req.body.name,
        productImage: req.body.productImage,
        description: req.body.description,
        price: req.body.price,
        offerPrice: req.body.offerPrice,
        isAvailable: req.body.isAvailable,
        isTodayOffer: req.body.isTodayOffer,
        category: cat.catName,
        subCategory: req.body.subCategory
    });
    await newProduct.save();
    res.send({msg: 'New product added successfully', data: newProduct});
});

router.post('/image-upload', upload.single('imgUrl'), async (req,res)=> {
	let newImage = new product.imageModel({
		imgUrl: imgPort+ '/uploads/' + req.file.filename
	} )
	
	await newImage.save();
	res.send(JSON.stringify(newImage.imgUrl));
} );

router.get('/image-retrieve', async (req,res) => {
    let links = await product.imageModel.find();
    res.send(links);
});

router.delete('/image-delete/:image', async (req,res) => {
    let data=await product.imageModel.findOneAndRemove({imgUrl: req.params.image});
    if(!data){return res.send('No matching data found to delete');}
    res.send({
        msg: 'Deleted',
        data: data 
    })
});

module.exports = router;