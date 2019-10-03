const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const userRegister = require('../mongodb/userRegistration');
const isAdminGrant = require('../middleware/isAdminUserlogin');
const auth = require('../middleware/authenticate');

//API for user login
router.get('/user-login', async (req,res) =>{
    let schema = Joi.object({
        userLogin:{
            userEmail: Joi.string().required().min(9).max(150),
            userPassword: Joi.string().required().min(3).max(150)
        }
    });
    let {error} = schema.validate(req.boy);
    if(error){ 
        return res.send(error.details[0].message);
    }
    let checkEmail = await userRegister.userRegisterModel.findOne({"userLogin.userEmail": req.body.userLogin.userEmail });
    if(!checkEmail){
        return res.send('Invalid Credentials! Try again');
    }
    let checkPass = await bcrypt.compare( req.body.userLogin.userPassword, checkEmail.userLogin.userPassword);
    if(!checkPass){
        return res.send('Invalid Credentials! Try again');
    }
    else{
        let token = checkEmail.userIdentity();
        res.header('x-auth-token', token).send('Login Successfull');
        res.end();
    }
});

//API to delete user with authentication and isAdmin middlewares
router.delete('/delete-user/:id', [auth,isAdminGrant],async (req,res) => {
    let checkUser = await userRegister.userRegisterModel.findByIdAndRemove(req.params.id);
    if(!checkUser){
        return res.send('ID does not exist');
    }
    res.send({
        msg: `User ${checkUser.firstname} deleted from database`
    });
    
})

module.exports = router;