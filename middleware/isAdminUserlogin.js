function isAdminGrant(req,res,next){
    let isAdmin = req.userRegistration.isAdmin;
    if(!isAdmin){
        return res.send('You dont have admin right to perform the current operations.');
    }
    return next();
}

module.exports = isAdminGrant;