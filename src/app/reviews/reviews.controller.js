const Joi = require('joi');
const service = require('./reviews.service');
const schemas = require('./schemas');
const errors = require('../util/errors');

const getAll = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();
    const dbAdapter = res.locals.dbAdapter;
    const productId = req.param.productId;    
    const query = { productId };

    service.getAll(dbAdapter,query)
        .then(result =>{
            if(result) {
                res.locals.status = 200;
                res.locals.data = result;
                next();
            } else {
                res.locals.error =  {
                    type: errors.BAD_REQUEST,
                    msg: 'Product Has No Reviews Yet'
                };
                next();
            }
            
        }).catch(err => {
            res.locals.error =  {
                type: errors.SERVER_ERROR,
                msg: 'Internal Server Error'
            };
            next()
        });
}

module.exports =  {    
    getAll
};
