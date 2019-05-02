const _ = require("lodash");
const Joi = require('joi');
const stripe = require("stripe")(process.env.STRIPE_KEY)
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

    userService.get(dbAdapter, id, query)
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

                    const targetItemIdx = user.cart.items.findIndex(item => item.productId === productId);
                    
                    if (targetItemIdx !== -1){
                        
                        let targetItem = user.cart.items[targetItemIdx];
                        const oldQuantity = targetItem.quantity;
                        if (_.has(data,"quantity")){
                            
                            user.cart.items[targetItemIdx] = Object.assign({...targetItem, quantity: data.quantity})
                        } else {
                            user.cart.items[targetItemIdx] = Object.assign({...targetItem, quantity: oldQuantity+1})
                        }
                        
                        const newQuantity = user.cart.items[targetItemIdx].quantity;
                        if (newQuantity > oldQuantity) {
                            user.cart.total += targetItem.product.price * (newQuantity - oldQuantity);
                        } else if (newQuantity < oldQuantity) {
                            user.cart.total -= targetItem.product.price * (oldQuantity - newQuantity);
                        }

                    } else {
                        
                        let cartItem = {
                            productId: productId, 
                            product: product
                        }
                        if (_.has(data,"quantity")){
                            cartItem = Object.assign({...cartItem, quantity: data.quantity})
                        } else {
                            cartItem = Object.assign({...cartItem, quantity: 1})
                        }
                        user.cart.items.push(cartItem)
                        user.cart.total += cartItem.product.price * cartItem.quantity;
                    }

                    Joi.validate(user, UserSchemas.update)
                        .then(()=>{
                            userService.update(dbAdapter, userId, user, query)
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
                        msg: 'User Not Found ...'
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
                    userService.update(dbAdapter, userId, user, query)
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

const pay = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const userId = req.params.id;
    const query = req.query;

    const data = req.body;
    userService.get(dbAdapter, userId, query)
        .then(result =>{
            if(result){
                const totalCharges = result.cart.total;
                let descList = result.cart.items.map(item=>{
                    const itemPrice = item.quantity * item.product.price;
                    return `${item.quantity} Copy of |${item.product.title}| by ${itemPrice} usd`
                })
                let description = descList.reduce((acc,msg)=>{
                    return `${acc} and ${msg}`;
                },"")
                description = result.username + " is buying " + description.substring(5,description.length);
                
                const charge = {
                    amount: totalCharges,
                    currency: "usd",
                    description: description,
                    source: data.token.id
                };
                stripe.charges.create(charge)
                    .then(status=>{
                        const result = {
                            "success": true,
                            "message": status.outcome.seller_message
                        }
                        res.locals.status = 200;
                        res.locals.data = result;
                        next();
                    })
                    .catch(err=>{
                        const result = {
                            "success": false,
                            "message": "Payment Failed"
                        }
                        res.locals.status = 200;
                        res.locals.data = result;
                        next();
                    })
            }else{
                res.locals.error =  {
                    type: errors.NOT_FOUND,
                    msg: 'User Not Found'
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
    getAll,
    deleteAll,
    addItem,
    deleteItem,
    pay
};
