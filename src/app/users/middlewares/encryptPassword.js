const bcrypt = require('bcrypt');
const errors = require('../../util/errors');

module.exports = function encryptPassword(req, res, next){    
    if(!req.url.includes("auth")){
        const password = req.body.password;
        if(password){
            bcrypt.hash(password, 10).then(hash=>{
                req.body.password = hash;
                next();
            }).catch(err=>{
                res.locals.error =  {
                    type: errors.SERVER_ERROR,
                    msg: 'Internal Server Error'
                };
            });
        }else{
            next();
        }
    }else{        
        next();
    }    
}