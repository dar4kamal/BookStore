const Joi = require('joi');
const productSchema = require('../../products/schemas/update.schema')

const createSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(8).max(60).required(),
    role: Joi.string().default("user", "Customer Init"),
    cart: Joi.object({
        items:[{
            product: productSchema,
            quantity: Joi.number().default(0)
        }],
        total: Joi.number().default(0)})
    .default({items:[],total:0}, "initiate cart")
});

module.exports = createSchema;