const _ = require("lodash");
const Joi = require('joi');
const service = require('./users.service');
const schemas = require('./schemas');
const errors = require('../util/errors');

const getAll = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const query = req.query;

    service.getAll(dbAdapter,query)
        .then(result =>{
            res.locals.status = 200;
            res.locals.data = result;
            next();
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
    let data = req.body;
    const query = req.query;

    if(!_.has(data, "role")){
        data = Object.assign({...data, role: "user"})
    }
    
    const defaultCart = {
        items: [],
        total: 0
    }
    if(!_.has(data, 'cart')){
        data = Object.assign({...data, cart: defaultCart})
    }

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
                            msg: 'username already exists, please choose an other one'
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
                console.log(err.details)
                res.locals.error =  {
                    type: errors.BAD_REQUEST,
                    msg: 'Invalid Body Format'
                };
            next()
        });
}

const update = function (req, res, next) {
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
                            msg: 'User Not Found'
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

const get = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const id = req.params.id;
    const query = req.query;

    service.get(dbAdapter, id, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = result;
            }else{
                res.locals.error =  {
                    type: errors.NOT_FOUND,
                    msg: 'User Not Found'
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
    update,
    create,
    getAll,
    get
};
