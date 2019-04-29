const Joi = require('joi');
const productSchema = require('../../products/schemas/update.schema')


const updateSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email().max(256),
    role: Joi.string().default("user", "Customer Init"),
    cart:Joi.object({
        items:[{
            product: productSchema,
            quantity: Joi.number().default(0)
        }],
        total: Joi.number().default(0)})
});

module.exports = updateSchema;