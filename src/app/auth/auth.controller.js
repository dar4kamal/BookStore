const Joi = require('joi');
const service = require('./auth.service');
const schemas = require('./schemas');
const errors = require('../util/errors');

const login = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const secret = res.locals.secret;
    const data = req.body;

    Joi.validate(data, schemas.login)
        .then(()=>{
            service.login(dbAdapter, data, secret)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: errors.UNAUTHORIZED,
                            msg: 'Invalid username and password!'
                        };
                    }
                    next();
                }).catch(err => {
                    res.locals.error =  {
                        type: errors.SERVER_ERROR,
                        msg: 'Internal Server Error'
                    };
                    next()
                });
        })
        .catch(err => {
            res.locals.error =  {
                type: errors.BAD_REQUEST,
                msg: 'Invalid Body Format'
            };
            next()
        });
}


module.exports =  {
    login
};
