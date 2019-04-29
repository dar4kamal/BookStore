const _ = require("lodash");
const Joi = require('joi');
const UserSchemas = require('../users/schemas');
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
    const userId = req.params.id;
    const defaultCart = {
        items: [],
        total: 0
    }
    data.cart = defaultCart;
    const query = req.query;    

    Joi.validate(data, UserSchemas.update)
        .then(()=>{
            userService.update(dbAdapter, userId, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result.cart;
                    }else{
                        res.locals.error =  {
                            type: errors.BAD_REQUEST,
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
const addItem = function (req, res, next) {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;    
    const data = req.body;
    const userId = req.params.id;    
    const query = req.query;    
        
    productService.get(dbAdapter,data.productId)
        .then(product => {

            const productId = product._id.toString();
            product = Object.keys(product).filter(key=>{
                return key !== "_id"
            })
            .reduce((obj, key) => {
                obj[key] = product[key];
                return obj;
              }, {})
            
            userService.get(dbAdapter,userId)
                .then(user =>{
                    
                    const unWanted = ["_id","password"];
                    user = Object.keys(user).filter(key=> !unWanted.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = user[key];
                        return obj;
                    }, {})                    
                    
                    user.cart.items.push({productId: productId, product, quantity:1})
                    user.cart.total += product.price;

                    Joi.validate(user, UserSchemas.update)
                        .then(()=>{
                            service.update(dbAdapter, userId, user, query)
                                .then(result =>{
                                    if(result){
                                        res.locals.status = 200;
                                        res.locals.data = result.cart;
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
                })
                .catch(err=>{
                    res.locals.error =  {
                        type: errors.NOT_FOUND,
                        msg: 'User Not Found'
                    };
                    next()
                });
        }).catch(err=>{

            res.locals.error =  {
                type: errors.NOT_FOUND,
                msg: 'Product Not Found'
            };
            next();
        });    
}

const deleteItem = function (req, res, next) {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;    
    const data = req.body;
    const userId = req.params.id;    
    const query = req.query;
    const productId = data.productId;

    userService.get(dbAdapter,userId)
        .then(user =>{
            
            const unWanted = ["_id","password"];
            user = Object.keys(user).filter(key=> !unWanted.includes(key))
            .reduce((obj, key) => {
                obj[key] = user[key];
                return obj;
            }, {})
            // console.log("cart items ",user.cart.items)
            let targetItem = user.cart.items.filter(item=>{
                return item.productId === productId.toString();
            })[0]
            
            if (targetItem === undefined) {
                throw new Error("Product Not Found")
            }
        
            user.cart.items = user.cart.items.filter(item=>{
                return item.productId !== productId;
            })

            user.cart.total -= targetItem.product.price * targetItem.quantity ;                        

            Joi.validate(user, UserSchemas.update)
                .then(()=>{
                    service.update(dbAdapter, userId, user, query)
                        .then(result =>{
                            if(result){
                                res.locals.status = 200;
                                res.locals.data = result.cart;
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
        })
        .catch(err=>{
            if (err.message.includes("Product")) {
                res.locals.error =  {
                    type: errors.NOT_FOUND,
                    msg: 'Product Not Found'
                };
            } else {
                res.locals.error =  {
                    type: errors.NOT_FOUND,
                    msg: 'User Not Found'
                };
            }
            next();
        });
}

module.exports =  {
    getAll,
    deleteAll,
    addItem,
    deleteItem
};
