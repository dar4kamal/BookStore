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
                    res.locals.error =  {
                        type: errors.BAD_REQUEST,
                        msg: `${srcUrl} Has No Reviews Yet`
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


module.exports =  {
    getAll,
    create
};
