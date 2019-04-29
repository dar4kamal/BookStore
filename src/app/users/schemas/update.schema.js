const Joi = require('joi');
const productSchema = require('../../products/schemas/update.schema')

const cartItem = Joi.object().keys({
    productId: Joi.string(),
    product: productSchema,
    quantity: Joi.number()
})

const updateSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email().max(256),
    role: Joi.string().default("user", "Customer Init"),
    cart: Joi.object().keys({
        items: Joi.array().items(cartItem),
        total: Joi.number()})
});

module.exports = updateSchema;