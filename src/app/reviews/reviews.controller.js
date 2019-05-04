const Joi = require('joi');
const service = require('./reviews.service');
const schemas = require('./schemas');
const errors = require('../util/errors');

const getAll = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();
    const dbAdapter = res.locals.dbAdapter;
    const id = req.params.id;
    var query = req.query;
    var srcUrl = "";

    if (req.url.includes("products")) {
        query = Object.assign({...query, productId: id })
        srcUrl = "Product";
    } else if (req.url.includes("users")) {
        query = Object.assign({...query, userId: id })
        srcUrl = "User";
    }
    
    service.getAll(dbAdapter,query)
        .then(result =>{
            if(result) {
                res.locals.status = 200;
                res.locals.data = result;
                next();
            } else {
                if (srcUrl) {
                    const msg = srcUrl === "User" ? 
                        `User has't add reviews yet` : 
                        `Product has no reviews yet`;
                    res.locals.error =  {
                        type: errors.BAD_REQUEST,
                        msg: msg
                    };
                }                
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

const create = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;    
    const data = req.body;
    const query = req.query;

    Joi.validate(data, schemas.create)
        .then(()=>{
            service.create(dbAdapter, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 201;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: errors.BAD_REQUEST,
                            msg: 'review already exists'
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
            if (err.details[0].message.includes("length")){
                res.locals.error =  {
                    type: errors.BAD_REQUEST,
                    msg: `review${err.details[0].message.split("length")[1]}`
                };    
            } else {
                res.locals.error =  {
                    type: errors.BAD_REQUEST,
                    msg: 'Invalid Body Format'
                };
            }            
            next()
        });
}

const update = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const data = req.body;
    const id = req.params.id;
    const query = req.query;

    Joi.validate(data, schemas.update)
        .then(()=>{
            service.update(dbAdapter, id, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: errors.NOT_FOUND,
                            msg: 'Review Not Found'
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
            if (err.details[0].message.includes("length")){
                res.locals.error =  {
                    type: errors.BAD_REQUEST,
                    msg: `review${err.details[0].message.split("length")[1]}`
                };    
            } else {
                res.locals.error =  {
                    type: errors.BAD_REQUEST,
                    msg: 'Invalid Body Format'
                };
            }            
            next()
        });
}

const remove = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();
        
    const dbAdapter = res.locals.dbAdapter;
    const id = req.params.id;
    const query = req.query;

    service.remove(dbAdapter, id, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = {};
            }else{
                res.locals.error =  {
                    type: errors.NOT_FOUND,
                    msg: 'Review Not Found'
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
}

module.exports =  {
    getAll,
    create,
    update,
    remove
};
