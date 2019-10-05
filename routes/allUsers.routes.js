const express = require('express');
const router = express.Router();
const users = require('../mongodb/userRegistration');
const isAdmin = require('../middleware/isAdminUserlogin');
const auth = require('../middleware/authenticate');

router.get('/all-users', [auth, isAdmin], async (req,res) =>{
    let data = await users.userRegisterModel.find();
    res.send({
        msg: 'Welcome admin, following are current registered users',
        data: data
    })
});

module.exports = router;