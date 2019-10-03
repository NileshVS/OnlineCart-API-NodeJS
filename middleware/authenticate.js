const jwt = require('jsonwebtoken');
const config = require('config');

function authenticate(req,res,next){
    let token = req.header('x-auth-token');
    if(!token){return res.send('Token not found, please login');}
    try{
        let decoded = jwt.verify(token, config.get('jwtKey'));
        req.decodedToken=decoded;
        next();
    }
    catch(ex){
        res.send('Token not verified');
        console.log(ex.message);
    }
}

module.exports=authenticate;