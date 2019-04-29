const Joi = require('joi');
const service = require('./cart.service');
const schemas = require('../users/schemas');
const errors = require('../util/errors');
const productService = require('../products/products.service')
const userService = require('../users/users.service')

const getAll = (req, res, next) => {
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
                res.locals.data = result.cart;
            }else{
                res.locals.error =  {
                    type: errors.NOT_FOUND,
                    msg: 'user Not Found'
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
const deleteAll = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;    
    let data = req.body;
    data.cart = {
        items:[],
        total:0}
    const query = req.query;    

    Joi.validate(data, schemas.create)
        .then(()=>{
            service.update(dbAdapter, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 201;
                        res.locals.data = result.cart;
                    }else{
                        res.locals.error =  {
                            type: errors.BAD_REQUEST,
                            msg: 'all is already deleted'
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
const addItem = function (req, res, next) {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    let data = req.body;
    const id = req.params.id;
    const item_id =  req.params.item;
    const query = req.query;    
    
    const product= productService.get(dbAdapter,item_id);
    let user = userService.get(dbAdapter,id);
    user.cart.items.push({product,quantity:1})
    user.cart.total += product.price;

    Joi.validate(user, schemas.update)
        .then(()=>{
            service.update(dbAdapter, id, user, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result.cart;
                    }else{
                        res.locals.error =  {
                            type: errors.NOT_FOUND,
                            msg: 'you ca Not Found'
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

const deleteItem = function (req, res, next) {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    let data = req.body;
    const id = req.params.id;
    const item_id =  req.params.item;
    const query = req.query;    
    
    let user = userService.get(dbAdapter,id);
    let tragetProduct = user.cart.items.filter(item=>{
        return item.product._id === item_id;
    })[0]

    user.cart.items = user.cart.items.filter(item=>{
        return item.product._id !== item_id;
    })
    user.cart.total -= tragetProduct.product.price * tragetProduct.quantity ;

    Joi.validate(user, schemas.update)
        .then(()=>{
            service.update(dbAdapter, id, user, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result.cart;
                    }else{
                        res.locals.error =  {
                            type: errors.NOT_FOUND,
                            msg: 'you ca Not Found'
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
    getAll,
    deleteAll,
    addItem,
    deleteItem
};
