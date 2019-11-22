const  express = require('express');
const router = express.Router();
const user = require('../mongodb/userRegistration');
const cart = require('../mongodb/cartSchema');
const auth = require('../middleware/authenticate');

router.get('/usercart', auth,async (req,res) => {

    try{        
        let userEml = await user.userRegisterModel.findById(req.userRegistration._id).select("userLogin.userEmail");
        console.log(userEml);
        if(!userEml){
            return res.send('User email does not exist!');
        }

        let cartUserEmail = await cart.cartModel.find({userEmail: userEml.userLogin.userEmail});

        if(!cartUserEmail){
            return res.send('Something went wrong');
        }

        res.send({data: cartUserEmail});
    }
    catch(ex){
        res.send(ex.message);
    }
});
module.exports=router;